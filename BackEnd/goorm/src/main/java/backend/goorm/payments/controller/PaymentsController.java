package backend.goorm.payments.controller;


import backend.goorm.payments.model.dto.request.KakaoPayRequest;
import backend.goorm.payments.model.dto.response.KakaoAproveResponse;
import backend.goorm.payments.model.dto.response.KakaoReadyResponse;
import backend.goorm.payments.service.PaymentsService;
import backend.goorm.payments.util.SessionUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@Slf4j
@RequiredArgsConstructor
public class PaymentsController {

    private final PaymentsService paymentsService;


    @PostMapping("/kakao/ready")
    public ResponseEntity readyToKakaoPay(@RequestBody KakaoPayRequest kakaoPayRequest){

        KakaoReadyResponse kakaoReadyResponse = paymentsService.readyToKakaoPay(kakaoPayRequest);

        SessionUtils.addAttribute("tid", kakaoReadyResponse.getTid());
        log.info("결제 고유번호: " + kakaoReadyResponse.getTid());

        return ResponseEntity.ok(kakaoReadyResponse);
    }

    @GetMapping("/kakao/completed")
    public ResponseEntity kakaoPayCompleted(@RequestParam("pg_token") String pgToken){

        String tid = SessionUtils.getStringAttributeValue("tid");
        log.info("결제승인 요청을 인증하는 토큰: " + pgToken);
        log.info("결제 고유번호: " + tid);

        KakaoAproveResponse approveResponse = paymentsService.kakaoPayApprove(tid, pgToken);

        return ResponseEntity.ok(approveResponse);
    }


}
