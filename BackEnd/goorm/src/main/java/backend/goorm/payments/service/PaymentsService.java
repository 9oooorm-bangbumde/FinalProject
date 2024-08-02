package backend.goorm.payments.service;

import backend.goorm.payments.model.dto.request.KakaoPayRequest;
import backend.goorm.payments.model.dto.response.KakaoAproveResponse;
import backend.goorm.payments.model.dto.response.KakaoReadyResponse;
import org.springframework.http.ResponseEntity;

public interface PaymentsService {
    KakaoReadyResponse readyToKakaoPay(KakaoPayRequest kakaoPayRequest);

    KakaoAproveResponse kakaoPayApprove(String tid, String pgToken);
}
