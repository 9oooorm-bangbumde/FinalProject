package backend.goorm.payments.service;

import backend.goorm.payments.model.dto.request.KakaoPayRequest;
import backend.goorm.payments.model.dto.response.KakaoReadyResponse;
import backend.goorm.payments.util.SessionUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentsServiceImpl implements PaymentsService {

    @Value("${kakao.secret.key}")
    private String admin_Key;
    @Value("${kakao.base.fail-url}")
    private String failUrl;

    @Value("${kakao.base.success_url}")
    private String successUrl;

    @Value("${kakao.base.cancel_url}")
    private String cancelUrl;

    private final String order_id = "gym_payments";
    private final String cid = "TC0ONETIME";

    @Override
    public KakaoReadyResponse readyToKakaoPay(KakaoPayRequest kakaoPayRequest) {

        Map<String, String> parameters = new HashMap<>();
        parameters.put("cid", cid);                                    // 가맹점 코드(테스트용)
        parameters.put("partner_order_id", order_id);                       // 주문번호
        parameters.put("partner_user_id", "bangbumde");                          // 회원 아이디
        parameters.put("item_name", kakaoPayRequest.getItemName());                                      // 상품명
        parameters.put("quantity", "1");                                        // 상품 수량
        parameters.put("total_amount", kakaoPayRequest.getAmount());             // 상품 총액
        parameters.put("tax_free_amount", "0");                                 // 상품 비과세 금액
        parameters.put("approval_url", successUrl); // 결제 성공 시 URL
        parameters.put("cancel_url", cancelUrl);      // 결제 취소 시 URL
        parameters.put("fail_url", failUrl);          // 결제 실패 시 URL

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://open-api.kakaopay.com/online/v1/payment/ready";

        ResponseEntity<KakaoReadyResponse> responseEntity = restTemplate.postForEntity(url, requestEntity, KakaoReadyResponse.class);
        log.info("결제준비 응답객체: " + responseEntity.getBody());

        return responseEntity.getBody();
    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();

        String auth = "SECRET_KEY " + admin_Key;

        headers.set("Authorization", auth);
        headers.set("Content-type", "application/json");

        return headers;
    }
}
