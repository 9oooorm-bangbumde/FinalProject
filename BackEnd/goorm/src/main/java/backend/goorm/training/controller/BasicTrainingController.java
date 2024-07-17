package backend.goorm.training.controller;

import backend.goorm.training.dto.AddTrainingInput;
import backend.goorm.training.dto.TrainingDto;
import backend.goorm.training.service.BasicTrainingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin/trainings")
public class BasicTrainingController {

    private final BasicTrainingService basicTrainingService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TrainingDto> addBasicTraining(@RequestBody AddTrainingInput input) {
        TrainingDto result = basicTrainingService.addBasicTraining(input);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<List<TrainingDto>> getAllTrainings() {
        List<TrainingDto> trainings = basicTrainingService.getAllTrainings();
        return ResponseEntity.ok(trainings);
    }
}
