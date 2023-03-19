table book (책)
table comment (댓글)

책에 달린 댓글을 불러오고 싶어!

SELECT * FROM comment WHERE borrowId=?

전체 댓글 목록에서 책의 고유한 키값으로 (혹은 이 책에 달린 댓글이라는 것을 구분할 수 있는 데이터값으로)
조회해서 나온 데이터를 모두 불러와줘

저 책에 달린 댓글이다~
borrowID가 없기 때문에 사실상 불러오는게 불가능하다.



