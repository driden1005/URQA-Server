URQA-Server
===========

 - Branch naming rules
    'product' Branch : 사용자들에게 릴리즈 되는 브랜치
    'develop' Branch : 개발에 진행되는 브랜치

    1. 각 키워드 사이에는 토큰 '/'을 사용한다
        ex) develop/name/issue
    
    2. 한가지 이슈를 여럿이서 개발할때 Rule
        develop/issue/name

    3. 한사람이 여러 이슈를 담당하는것이 많으면
        develop/name/issue

    위와 같은 Rule을 통하여 Branch 이름을 정한다.
    ex1)issue #3에 대해 개발자 wolfses가 처리한다면 develop/wolfses/issue#3
    ex2)issue #4에 대해 개발자 wolfses,pegasuskim이 처리한다면 develop/issue#3/wolfses, develop/issue#3/pegasuskim
