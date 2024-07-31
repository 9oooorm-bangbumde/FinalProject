package backend.goorm.payments.model.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoPayRequest {

    private String itemName;
    private String amount;

}
