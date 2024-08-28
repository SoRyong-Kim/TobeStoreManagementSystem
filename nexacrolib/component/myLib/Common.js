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
pForm.gfnshowCurrentTime = function() 
{
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

pForm.gfnGetTime = function()
{
	var currentDate = new Date(); // 현재 날짜 및 시간 객체 생성
    var hours = currentDate.getHours(); // 시
    var minutes = currentDate.getMinutes(); // 분
    var seconds = currentDate.getSeconds(); // 초

    // 시간 형식 조정 (2자리 수로)
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    // 현재 시간 문자열 생성
    var currentTime = hours + '' + minutes + '' + seconds;
	
	return currentTime;
}

pForm.gfnGetFullTime = function()
{
	var currentDate = new Date(); // 현재 날짜 및 시간 객체 생성
	var year = currentDate.getFullYear(); // 연도
    var month = currentDate.getMonth() + 1; // 월 (0부터 시작하므로 1 더함)
    var day = currentDate.getDate(); // 일
    var hours = currentDate.getHours(); // 시
    var minutes = currentDate.getMinutes(); // 분
    var seconds = currentDate.getSeconds(); // 초
	
	// 월과 일이 2자리 수로 조정
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
	if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
	
	// 현재 시간 문자열로 생성
	var currentDateStr = year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds;
	
	return currentDateStr;
}

/**
* @class 권한 체크 <br>
* @param {Object} dsAuth - 권한을 비교할 데이터셋
* @param {String} sChkAuth - 확인할 권한 코드
* @return True/False
* @example 
* this.gfnAuthCheck(this.dsAuth, "admin");
*/
pForm.gfnCheckAuth = function(dsAuth, nChkAuth) 
{
	trace("dsAuth = "+dsAuth);
	trace("nChkAuth = "+nChkAuth);
	
	var nRowCnt = dsAuth.getRowCount();
	for(var i=0; i<nRowCnt; i++)
	{
		if( dsAuth.getColumn(i, "permission_id") == nChkAuth )
		{
			return true;
		}
	}
	this.gfnAlert("msg.err.authorize");
	return false;
}
pForm.gfnGetWorkTime = function(startDateStr, endDateStr) {
    // 문자열을 Date 객체로 변환
    var startYear = parseInt(startDateStr.substring(0, 4));
    var startMonth = parseInt(startDateStr.substring(4, 6)) - 1; // 월은 0부터 시작
    var startDay = parseInt(startDateStr.substring(6, 8));
    var startHour = parseInt(startDateStr.substring(8, 10));
    var startMinute = parseInt(startDateStr.substring(10, 12));
    var startSecond = parseInt(startDateStr.substring(12, 14));
    var startDate = new Date(startYear, startMonth, startDay, startHour, startMinute, startSecond);

    var endYear = parseInt(endDateStr.substring(0, 4));
    var endMonth = parseInt(endDateStr.substring(4, 6)) - 1;
    var endDay = parseInt(endDateStr.substring(6, 8));
    var endHour = parseInt(endDateStr.substring(8, 10));
    var endMinute = parseInt(endDateStr.substring(10, 12));
    var endSecond = parseInt(endDateStr.substring(12, 14));
    var endDate = new Date(endYear, endMonth, endDay, endHour, endMinute, endSecond);

    // 두 날짜의 차이를 초 단위로 계산
    var differenceInTime = Math.abs(endDate - startDate) / 1000;

    // 시간, 분, 초 계산
    var hours = Math.floor(differenceInTime / 3600);
    differenceInTime %= 3600;
    var minutes = Math.floor(differenceInTime / 60);
    var seconds = Math.floor(differenceInTime % 60);

    // 여섯 자리 숫자로 포맷팅
    var formattedTime = (hours.toString().padStart(2, '0') +
                         minutes.toString().padStart(2, '0') +
                         seconds.toString().padStart(2, '0'));

    return formattedTime;
}

pForm.gfnGetWorkTimeMinute = function(startDateStr, endDateStr) {
    // 문자열을 Date 객체로 변환
    var startYear = parseInt(startDateStr.substring(0, 4));
    var startMonth = parseInt(startDateStr.substring(4, 6)) - 1;
    var startDay = parseInt(startDateStr.substring(6, 8));
    var startHour = parseInt(startDateStr.substring(8, 10));
    var startMinute = parseInt(startDateStr.substring(10, 12));
    var startSecond = parseInt(startDateStr.substring(12, 14));
    var startDate = new Date(startYear, startMonth, startDay, startHour, startMinute, startSecond);

    var endYear = new Date().getFullYear();
    var endMonth = new Date().getMonth();
    var endDay = new Date().getDate();
    var endHour = new Date().getHours();
    var endMinute = new Date().getMinutes();
    var endSecond = new Date().getSeconds();
    var endDate = new Date(endYear, endMonth, endDay, endHour, endMinute, endSecond);

    // 두 날짜의 차이를 분 단위로 계산
    var differenceInTime = Math.abs(endDate - startDate) / 1000 / 60; // 초를 분으로 변환
	trace("differenceInTime = " + differenceInTime);
    // 소수점 버리기
    var totalMinutes = Math.floor(differenceInTime);

    return totalMinutes; // 분 단위로 반환
};


pForm.gfnGenerateId = function(nlength)
{
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // 사용할 문자 집합
    var result = '';

    for (var i = 0; i < nlength; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length); // 랜덤 인덱스 생성
        result += characters[randomIndex]; // 랜덤 문자 추가
    }

    return result;
}