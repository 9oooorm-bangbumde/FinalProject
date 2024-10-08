package backend.goorm.diet.api;

import backend.goorm.diet.entity.Food;
import backend.goorm.diet.repository.FoodRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FoodDataApiService {

    @Value("${data.apiKey}")
    private String serviceKey; // 전역 변수로 서비스 키를 받아옴

    private final FoodRepository foodRepository;

    public List<Food> fetchAndSaveFoodData() {
        List<Food> foodList = new ArrayList<>();
        int pageNo = 2;
        int totalPageCount = 227; // 총 227페이지까지 데이터 수집

        try {
            while (pageNo <= totalPageCount) {
                StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1");
                urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
                urlBuilder.append("&" + URLEncoder.encode("desc_kor", "UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*식품이름*/
                urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(pageNo), "UTF-8"));
                urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("100", "UTF-8"));
                urlBuilder.append("&" + URLEncoder.encode("type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
                URL url = new URL(urlBuilder.toString());
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Content-type", "application/json");

                BufferedReader rd;
                if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                    rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                } else {
                    rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
                }

                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = rd.readLine()) != null) {
                    sb.append(line);
                }
                rd.close();
                conn.disconnect();

                // JSON 응답을 처리하고, Food 엔티티로 변환
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(sb.toString());
                JsonNode itemsNode = rootNode.path("body").path("items");

                for (JsonNode item : itemsNode) {
                    Food food = FoodDataMapper.mapJsonToFoodEntity(item);


                    // 칼로리와 그램 값이 null이 아니고 0.0보다 큰 경우에만 리스트에 추가
                    if (food.getCalories() != null && food.getGram() != null &&
                            food.getCalories() > 0.0 && food.getGram() > 0.0) {
                        foodList.add(food);
                    }
                }

                log.info("Page {} processed.", pageNo);
                // 다음 페이지로 이동
                pageNo++;
            }
            // 데이터베이스에 저장
            foodRepository.saveAll(foodList);

        } catch (Exception e) {
            log.error("Error fetching and saving food data", e);
        }

        // foodList가 비어있는지 확인
        if (foodList.isEmpty()) {
            log.warn("No food data was retrieved from the API. The food list is empty.");
        } else {
            log.info("Successfully fetched and saved {} food items.", foodList.size());
        }

        return foodList;
    }
}