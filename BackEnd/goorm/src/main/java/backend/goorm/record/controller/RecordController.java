package backend.goorm.record.controller;

import backend.goorm.member.oauth.PrincipalDetails;
import backend.goorm.record.dto.AddCardioRecordRequest;
import backend.goorm.record.dto.AddStrengthRecordRequest;
import backend.goorm.record.dto.EditRecordRequest;
import backend.goorm.record.dto.RecordDto;
import backend.goorm.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/record")
public class RecordController {

    private final RecordService recordService;

    @PostMapping("/training/{id}/add/cardio")
    public ResponseEntity<RecordDto> addCardioRecord(@PathVariable("id") Long trainingId,
                                                     @Valid @ModelAttribute AddCardioRecordRequest request,
                                                     @RequestParam(value = "images", required = false) MultipartFile[] images,
                                                     @AuthenticationPrincipal PrincipalDetails principalDetails) {
        RecordDto result = recordService.addCardioRecord(trainingId, request, principalDetails.member(), images);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/training/{id}/add/strength")
    public ResponseEntity<RecordDto> addStrengthRecord(@PathVariable("id") Long trainingId,
                                                       @Valid @ModelAttribute AddStrengthRecordRequest request,
                                                       @RequestParam(value = "images", required = false) MultipartFile[] images,
                                                       @AuthenticationPrincipal PrincipalDetails principalDetails) {
        RecordDto result = recordService.addStrengthRecord(trainingId, request, principalDetails.member(), images);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/training/{id}/edit")
    public ResponseEntity<RecordDto> editRecord(@PathVariable("id") Long recordId,
                                                @Valid @ModelAttribute EditRecordRequest request,
                                                @RequestParam(value = "images", required = false) MultipartFile[] images,
                                                @AuthenticationPrincipal PrincipalDetails principalDetails) {
        RecordDto result = recordService.editRecord(recordId, request, principalDetails.member(), images);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/training/{id}/delete")
    public ResponseEntity<Void> deleteRecord(@PathVariable("id") Long recordId,
                                             @AuthenticationPrincipal PrincipalDetails principalDetails) {
        recordService.deleteRecord(recordId, principalDetails.member());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<RecordDto>> getAllRecords(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<RecordDto> records = recordService.getAllRecords(principalDetails.member());
        return ResponseEntity.ok(records);
    }
}
