package backend.goorm.board.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = 1749095854L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoard board = new QBoard("board");

    public final EnumPath<backend.goorm.board.model.enums.BoardCategory> boardCategory = createEnum("boardCategory", backend.goorm.board.model.enums.BoardCategory.class);

    public final StringPath boardCommentTexts = createString("boardCommentTexts");

    public final StringPath boardContent = createString("boardContent");

    public final BooleanPath boardDeleted = createBoolean("boardDeleted");

    public final NumberPath<Long> boardId = createNumber("boardId", Long.class);

    public final DateTimePath<java.time.LocalDateTime> boardRegDate = createDateTime("boardRegDate", java.time.LocalDateTime.class);

    public final StringPath boardTitle = createString("boardTitle");

    public final EnumPath<backend.goorm.board.model.enums.BoardType> boardType = createEnum("boardType", backend.goorm.board.model.enums.BoardType.class);

    public final StringPath boardWriter = createString("boardWriter");

    public final NumberPath<Integer> likesCnt = createNumber("likesCnt", Integer.class);

    public final backend.goorm.member.model.entity.QMember memberId;

    public final NumberPath<Integer> reportsCnt = createNumber("reportsCnt", Integer.class);

    public final NumberPath<Integer> viewCnt = createNumber("viewCnt", Integer.class);

    public QBoard(String variable) {
        this(Board.class, forVariable(variable), INITS);
    }

    public QBoard(Path<? extends Board> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoard(PathMetadata metadata, PathInits inits) {
        this(Board.class, metadata, inits);
    }

    public QBoard(Class<? extends Board> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberId = inits.isInitialized("memberId") ? new backend.goorm.member.model.entity.QMember(forProperty("memberId")) : null;
    }

}

