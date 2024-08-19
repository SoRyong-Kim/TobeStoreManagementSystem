/**
*  Necacro TobeStoreManagement
*  @MenuPath		Script 표준
*  @FileName		C:\TobeStoreManagement\nexacrolib\component\myLib\Common.js
*  @Creator			김소룡
*  @CreateDate		2024/08/13
*  @Desction		myLib 공통 코드

************** 소스 수정 이력 ***********************************************
*  date          		Modifier                Description
*******************************************************************************
*  2024/08/13     	    Education 	             최초 생성
********************************************************************************/

var pForm = nexacro.Form.prototype;

/**
 * @description 컴포넌트간의 배치 설정
 * @param  standComp - 기준이 되는 컴포넌트 ID
 * @param  componentId - 기준 컴포넌트로부터 배치 되는 컴포넌트 ID
 * @param  state - 기준 컴포넌트로부터 배치 방법
 *                 center - 중앙
 *                 bottom - 하단
 * @param  offset - (optional) 하단 배치 시 두 컴포넌트 간의 거리
 * @return none
*/ 
// pForm.gfnCenterComponent = function(pstandComp, componentId, state1, state2, offset) 
// {
//     // 기준 컴포넌트와 타겟 컴포넌트 참조 가져오기
//     if (pstandComp && componentId) {
//         var nLeft, nTop;
// 		
//         if (state1 === "center") {
//             // 중앙 배치
// 			if(state2 === "left" && offset !== undefined){
// 				nLeft = (pstandComp.width / 2) - (componentId.width / 2) + offset;
// 			} else {
// 				nLeft = (pstandComp.width / 2) - (componentId.width / 2);
// 			}
//             
// 			if(state2 === "top" && offset !== undefined){
// 				nTop = (pstandComp.height / 2) - (componentId.height / 2) + offset;
// 			} else {
// 				nTop = (pstandComp.height / 2) - (componentId.height / 2);
// 			}
//         } else if (state1 === "bottom" && offset !== undefined) {
//             // 하단 배치
//             nLeft = pstandComp.getOffsetLeft();
//             nTop = Number(pstandComp.getOffsetTop()) + Number(pstandComp.height) + Number(offset); // 기준 컴포넌트 하단 + offset
// 			
// 		} else {
//             console.error("잘못된 state 값 또는 offset이 필요합니다.");
//             return;
//         }
//         // 타겟 컴포넌트를 설정된 위치에 배치
//         componentId.set_left(nLeft);
//         componentId.set_top(nTop);
//     } else {
//         console.error("컴포넌트를 찾을 수 없습니다: ");
//     }
// };
pForm.gfnCenterComponent = function(pstandComp, componentId, state1, state2, offset) 
{
    // 기준 컴포넌트와 타겟 컴포넌트 참조 가져오기
    if (pstandComp && componentId) {
        var nLeft, nTop;
		
        if (state1 === "center") {
            // 중앙 배치
			if(state2 === "left" && offset !== undefined){
				nLeft = (pstandComp.width / 2) - (componentId.width / 2) + offset;
			} else {
				nLeft = (pstandComp.width / 2) - (componentId.width / 2);
			}
            
			if(state2 === "top" && offset !== undefined){
				nTop = (pstandComp.height / 2) - (componentId.height / 2) + offset;
			} else {
				nTop = (pstandComp.height / 2) - (componentId.height / 2);
			}
        } else if (state1 === "bottom" && offset !== undefined) {
            // 하단 배치
            nLeft = pstandComp.getOffsetLeft();
            nTop = Number(pstandComp.getOffsetTop()) + Number(pstandComp.height) + Number(offset); // 기준 컴포넌트 하단 + offset
			
		} else if (state1 === "left" && offset !== undefined) {
            // 하단 배치
            nLeft = Number(pstandComp.getOffsetLeft()) + Number(pstandComp.width) + Number(offset);
            nTop = Number(pstandComp.getOffsetTop()) + (pstandComp.height / 2) - (componentId.height / 2); // 기준 컴포넌트 하단 + offset
			
		} else {
            console.error("잘못된 state 값 또는 offset이 필요합니다.");
            return;
        }
        // 타겟 컴포넌트를 설정된 위치에 배치
        componentId.set_left(nLeft);
        componentId.set_top(nTop);
    } else {
        console.error("컴포넌트를 찾을 수 없습니다: ");
    }
};

// 현재 시간을 출력하는 함수
pForm.gfnshowCurrentTime = function() {
    var currentDate = new Date(); // 현재 날짜 및 시간 객체 생성
    var hours = currentDate.getHours(); // 시
    var minutes = currentDate.getMinutes(); // 분
    var seconds = currentDate.getSeconds(); // 초

    // 시간 형식 조정 (2자리 수로)
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    // 현재 시간 문자열 생성
    var currentTime = hours + ':' + minutes + ':' + seconds;
	
	return currentTime;
}
