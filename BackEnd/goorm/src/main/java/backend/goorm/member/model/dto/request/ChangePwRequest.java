package backend.goorm.member.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePwRequest {

    @NotBlank
    private String oldPassword;

    @NotBlank
    private String newPassword;
}
