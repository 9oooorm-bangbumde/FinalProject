package backend.goorm.board.controller;

import backend.goorm.board.model.dto.request.CommentSaveRequest;
import backend.goorm.board.model.dto.request.CommentUpdateRequest;
import backend.goorm.board.model.dto.response.CommentListResponse;
import backend.goorm.board.service.CommentService;
import backend.goorm.member.model.entity.Member;
import backend.goorm.member.oauth.PrincipalDetails;
import backend.goorm.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("api/comment")
@RestController
@Slf4j
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final MemberRepository memberRepository;

    /**
     * 댓글 저장
     * @param commentSaveRequest
     * @return
     */
    @PostMapping("/save")
    public ResponseEntity saveComment(@RequestBody CommentSaveRequest commentSaveRequest){

        Optional<Member> findMember = memberRepository.findByMemberId(1L);
        Member testMember = findMember.get();
        //PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        commentService.saveComment(commentSaveRequest, testMember);


        return ResponseEntity.ok("저장 완료");
    }

    /**
     * 댓글 리스트 불러오기
     * @param boardId
     * @return
     */
    @GetMapping("/list/{boardId}")
    public ResponseEntity listComments(@PathVariable Long boardId){

        CommentListResponse commentListResponse = commentService.getCommentList(boardId);

        return ResponseEntity.ok(commentListResponse);
    }

    @PostMapping("/delete/{commentId}")
    public ResponseEntity deleteComment(@PathVariable Long commentId){

        //PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        Optional<Member> findMember = memberRepository.findByMemberId(1L);
        Member testMember = findMember.get();

        commentService.deleteComment(commentId, testMember);

        return ResponseEntity.ok("삭제가 완료되었습니다");
    }


    @PostMapping("/update")
    public ResponseEntity updateComment(@RequestBody CommentUpdateRequest updateCommentRequest){

        //PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Optional<Member> findMember = memberRepository.findByMemberId(1L);
        Member testMember = findMember.get();


        commentService.updateComment(updateCommentRequest, testMember);

        return ResponseEntity.ok("수정이 완료되었습니다");
    }

}
