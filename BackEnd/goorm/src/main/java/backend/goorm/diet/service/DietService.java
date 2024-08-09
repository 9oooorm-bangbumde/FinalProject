package backend.goorm.diet.service;

import backend.goorm.diet.dto.DietCreateRequestDto;
import backend.goorm.diet.dto.DietMemoDto;
import backend.goorm.diet.dto.DietResponseDto;
import backend.goorm.diet.dto.DietUpdateRequestDto;
import backend.goorm.diet.entity.Diet;
import backend.goorm.diet.entity.DietMemo;
import backend.goorm.diet.entity.Food;
import backend.goorm.diet.enums.MealTime;
import backend.goorm.diet.repository.DietMemoRepository;
import backend.goorm.diet.repository.DietRepository;
import backend.goorm.diet.repository.FoodRepository;
import backend.goorm.member.model.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class DietService {

    private final DietRepository dietRepository;
    private final FoodRepository foodRepository;
    private final DietMemoRepository dietMemoRepository;

    public List<DietResponseDto> getDietByDate(LocalDate date, Member member) {
        List<Diet> diets = dietRepository.findByDietDateAndMember(date, member);
        String memoContent = getDietMemo(member, date);
        return DietResponseDto.fromEntityListWithMemo(diets, memoContent);
    }

    public List<DietResponseDto> getAllDiets(Member member) {
        List<Diet> diets = dietRepository.findByMember(member);

        return diets.stream()
                .map(diet -> {
                    Optional<DietMemo> dietMemoOptional = dietMemoRepository.findByMemberAndDate(member, diet.getDietDate());
                    String dietMemoContent = dietMemoOptional.map(DietMemo::getContent).orElse(null);
                    return DietResponseDto.fromEntityWithMemo(diet, dietMemoContent);
                })
                .collect(Collectors.toList());
    }

    public List<DietResponseDto> createDiet(DietCreateRequestDto dto, Member member) {
        List<DietResponseDto> responses = dto.getFoodQuantities().stream().map(foodQuantity -> {
            Food food = foodRepository.findById(foodQuantity.getFoodId())
                    .orElseThrow(() -> new IllegalArgumentException("Food not found with id: " + foodQuantity.getFoodId()));

            Diet diet = Diet.builder()
                    .food(food)
                    .quantity(foodQuantity.getQuantity())
                    .gram(foodQuantity.getGram())
                    .mealTime(MealTime.valueOf(dto.getMealTime().toUpperCase()))
                    .dietDate(dto.getDietDate())
                    .member(member)
                    .build();

            // 총 칼로리 계산 및 저장
            diet.calculateTotalCalories();

            Diet savedDiet = dietRepository.save(diet);


            return DietResponseDto.fromEntity(savedDiet);
        }).collect(Collectors.toList());

        return responses;
    }

    @Transactional
    public DietResponseDto updateDiet(Long dietId, DietUpdateRequestDto dto, Member member) {
        Diet diet = dietRepository.findById(dietId)
                .orElseThrow(() -> new IllegalArgumentException("Diet not found with id: " + dietId));

        // 권한 확인: 기록의 소유자가 현재 사용자와 일치하는지 확인
        if (!diet.getMember().getMemberId().equals(member.getMemberId())) {
            throw new IllegalArgumentException("You do not have permission to edit this diet.");
        }

        dto.updateEntity(diet, foodRepository);

        // 총 칼로리 계산 및 저장
        diet.calculateTotalCalories();

        Diet saved = dietRepository.save(diet);

        return DietResponseDto.fromEntity(saved);
    }

    @Transactional
    public List<DietResponseDto> editDietsAndMemos(List<DietUpdateRequestDto> requests, Member member) {
        List<DietResponseDto> updatedDiets = new ArrayList<>();
        LocalDate memoDate = null;
        String memoContent = null;

        for (DietUpdateRequestDto request : requests) {
            Diet diet = dietRepository.findById(request.getDietId())
                    .orElseThrow(() -> new IllegalArgumentException("Diet not found with id: " + request.getDietId()));

            // 권한 확인
            if (!diet.getMember().getMemberId().equals(member.getMemberId())) {
                throw new IllegalArgumentException("You do not have permission to edit this diet.");
            }

            // 식단 정보 업데이트
            request.updateEntity(diet, foodRepository);
            Diet saved = dietRepository.save(diet);

            // 메모 정보를 업데이트하기 위해 날짜와 메모 내용을 저장
            if (memoDate == null) {
                memoDate = request.getDietDate();
            }
            if (memoContent == null && request.getMemo() != null) {
                memoContent = request.getMemo();
            }
        }

        // 메모가 있을 경우에만 메모 업데이트 또는 생성
        if (memoDate != null && memoContent != null) {
            Optional<DietMemo> existingMemoOpt = dietMemoRepository.findByMemberAndDate(member, memoDate);

            if (existingMemoOpt.isPresent()) {
                DietMemo existingMemo = existingMemoOpt.get();
                existingMemo.setContent(memoContent); // 기존 메모 업데이트
                dietMemoRepository.save(existingMemo);
            } else {
                // 새로운 메모 생성
                DietMemo newMemo = DietMemo.builder()
                        .member(member)
                        .content(memoContent)
                        .date(memoDate)
                        .build();
                dietMemoRepository.save(newMemo);
            }
        }

        // 수정된 식단에 대한 응답 생성
        for (DietUpdateRequestDto request : requests) {
            Diet diet = dietRepository.findById(request.getDietId())
                    .orElseThrow(() -> new IllegalArgumentException("Diet not found with id: " + request.getDietId()));

            String memoContentForDto = dietMemoRepository.findByMemberAndDate(member, diet.getDietDate())
                    .map(DietMemo::getContent)
                    .orElse(null);

            updatedDiets.add(DietResponseDto.fromEntity(diet, memoContentForDto));
        }

        return updatedDiets;
    }





    public boolean deleteDiet(Long dietId, Member member) {
        Diet diet = dietRepository.findById(dietId)
                .orElseThrow(() -> new IllegalArgumentException("Diet not found with id: " + dietId));

        // 권한 검사: 현재 로그인한 사용자가 해당 다이어트 항목을 삭제할 수 있는지 확인
        if (!diet.getMember().getMemberId().equals(member.getMemberId())) {
            throw new IllegalArgumentException("You do not have permission to delete this diet.");
        }

        dietRepository.delete(diet);
        return true;
    }

    public DietMemoDto addOrUpdateDietMemo(DietMemoDto memoDto, Member member) {
        Optional<DietMemo> existingMemoOpt = dietMemoRepository.findByMemberAndDate(member, memoDto.getDate());

        DietMemo memo;
        if (existingMemoOpt.isPresent()) {
            memo = existingMemoOpt.get();
            memo.setContent(memoDto.getContent());
        } else {
            memo = DietMemo.builder()
                    .member(member)
                    .date(memoDto.getDate())
                    .content(memoDto.getContent())
                    .build();
        }

        DietMemo savedMemo = dietMemoRepository.save(memo);
        return DietMemoDto.fromEntity(savedMemo);
    }


    public String getDietMemo(Member member, LocalDate date) {
        return dietMemoRepository.findByMemberAndDate(member, date)
                .map(DietMemo::getContent)
                .orElse(null);
    }
}
