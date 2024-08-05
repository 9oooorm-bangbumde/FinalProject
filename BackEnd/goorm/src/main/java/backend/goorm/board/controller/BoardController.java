package backend.goorm.board.controller;

import backend.goorm.board.model.dto.request.BoardSaveRequest;
import backend.goorm.board.model.dto.BoardListItem;
import backend.goorm.board.model.dto.request.BoardUpdateRequest;
import backend.goorm.board.model.dto.request.CommentSaveRequest;
import backend.goorm.board.model.dto.response.BoardDetailResponse;
import backend.goorm.board.model.dto.response.BoardListResponse;
import backend.goorm.board.model.enums.BoardCategory;
import backend.goorm.board.model.enums.BoardSortType;
import backend.goorm.board.model.enums.BoardType;
import backend.goorm.board.repository.BoardRepository;
import backend.goorm.board.service.BoardService;
import backend.goorm.member.model.entity.Member;
import backend.goorm.member.oauth.PrincipalDetails;
import backend.goorm.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@Slf4j
public class BoardController {

    private final BoardService boardService;
    private final MemberRepository memberRepository;

    /**
     * 게시글 등록
     * @param saveRequest
     * @return
     */
    @PostMapping("/save")
    public ResponseEntity saveBoard(@RequestBody BoardSaveRequest saveRequest){

        //PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        Optional<Member> findMember = memberRepository.findByMemberId(6L);
        Member testMember = findMember.get();

        boardService.saveBoard(saveRequest,testMember);

        return ResponseEntity.ok("게시글 등록 완료");
    }

    /**
     * 게시글 목록 조회
     * @param page
     * @param boardType
     * @param sortType
     * @param categories
     * @return
     */
    @GetMapping("/list/{page}")
    public ResponseEntity getBoardList(@PathVariable int page,
                                       @RequestParam BoardType boardType,
                                       @RequestParam(defaultValue = "DATE_DESC")BoardSortType sortType,
                                       @RequestParam(defaultValue = "")List<BoardCategory> categories,
                                       @RequestParam(defaultValue = "")String keyword){

        BoardListResponse boardList = boardService.getBoardList(boardType, page, sortType, categories, keyword);

        return ResponseEntity.ok(boardList);
    }


    @GetMapping("/detail/{boardId}")
    public ResponseEntity getBoardDetail(@PathVariable Long boardId, Authentication authentication){


        //PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        Optional<Member> findMember = memberRepository.findByMemberId(6L);
        Member testMember = findMember.get();

        BoardDetailResponse detailResponse = boardService.getBoardDetail(boardId, testMember);

        return ResponseEntity.ok(detailResponse);
    }

    @PostMapping("/delete/{boardId}")
    public ResponseEntity deleteBoard(@PathVariable Long boardId){

        //PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        Optional<Member> findMember = memberRepository.findByMemberId(6L);
        Member testMember = findMember.get();

        boardService.deleteBoard(boardId, testMember);

        return ResponseEntity.ok("삭제 완료");
    }

    @PostMapping("/update")
    public ResponseEntity updateBoard(@RequestBody BoardUpdateRequest updateRequest){
        //PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();


        Optional<Member> findMember = memberRepository.findByMemberId(6L);
        Member testMember = findMember.get();

        boardService.updateBoard(updateRequest, testMember);

        return ResponseEntity.ok("수정 완료");
    }

    @PostMapping("/toggle/like/{boardId}")
    public ResponseEntity toggleLike(@PathVariable Long boardId){

        //PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Optional<Member> findMember = memberRepository.findByMemberId(6L);
        Member testMember = findMember.get();


        String message = boardService.toggleLike(boardId, testMember);

        return ResponseEntity.ok(message);
    }


}
