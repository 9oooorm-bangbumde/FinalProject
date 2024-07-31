package backend.goorm.payments.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KakaoReadyResponse {
    private String tid;
    private String next_redirect_pc_url;
    private String created_at;
}
