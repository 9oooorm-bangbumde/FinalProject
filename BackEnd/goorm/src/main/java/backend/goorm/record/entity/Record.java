package backend.goorm.record.entity;

import backend.goorm.training.model.entity.Training;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "record")
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Long recordId;

    @ManyToOne
    @JoinColumn(name = "training_id")
    private Training training;

    @Column(name = "record_date", nullable = false)
    private LocalDateTime recordDate;

    @Column(name = "exercise_date", nullable = false)
    private LocalDate exerciseDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @Column(name = "calories_burned", nullable = false)
    private Float caloriesBurned;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "intensity")
    private String intensity;

    @Column(name = "sets")
    private Integer sets;

    @Column(name = "reps") // 횟수 필드 추가
    private Integer reps;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "distance")
    private Float distance;

    @Column(name = "incline")
    private Float incline;

    @Column(name = "memo", length = 1000)
    private String memo;

    @Column(name = "satisfaction")
    private Integer satisfaction;
}
