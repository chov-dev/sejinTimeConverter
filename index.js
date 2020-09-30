const timeInputed__time = document.querySelector(".timeInputed__time");
const timeConverted__time = document.querySelector(".timeConverted__time");
const convertButton = document.querySelector(".convertButton");

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

let isConvertToSejin = true;

const returnMorOrAft = (isMor) => {
  if (isMor) {
    return "오전";
  } else {
    return "오후";
  }
};

const isMorNml = (hours) => {
  if (hours % 24 < 12) {
    return true;
  } else {
    return false;
  }
};

const isMorSjs = (hours) => {
  if (hours % 48 < 24) {
    return true;
  } else {
    return false;
  }
};

const removeMor = (isSjs, hours) => {
  if (isSjs === true) {
    if (24 <= hours) {
      return hours - 24;
    } else {
      return hours;
    }
  } else {
    if (12 <= hours) {
      return hours - 12;
    } else {
      return hours;
    }
  }
};

// 시간 변환

const toSejinStandard = (hours) => {
  if (hours < 48) {
    return `${returnMorOrAft(isMorSjs(hours))} ${removeMor(true, hours)} 시`;
  } else {
    const leftDays = (hours - (hours % 48)) / 48;
    return `${leftDays}일 후 ${returnMorOrAft(isMorSjs(hours))} ${removeMor(
      true,
      hours - 48 * leftDays
    )} 시`;
  }
};

const toNormalStandard = (hours) => {
  if (hours < 24) {
    return `${returnMorOrAft(isMorNml(hours))} ${removeMor(false, hours)} 시`;
  } else {
    const leftDays = (hours - (hours % 24)) / 24;
    return `${leftDays}일 후 ${returnMorOrAft(isMorNml(hours))} ${removeMor(
      false,
      hours - 24 * leftDays
    )} 시`;
  }
};

// 자동 변환

const handleChangeConvertStatus = () => {
  if (isConvertToSejin === true) {
    isConvertToSejin = false;
    convertButton.classList.add("convertButton--rotated");
    timeInputed__time.value = "";
    timeConverted__time.value = "";
  } else {
    isConvertToSejin = true;
    convertButton.classList.remove("convertButton--rotated");
    timeInputed__time.value = "";
    timeConverted__time.value = "";
  }
};

convertButton.addEventListener("click", handleChangeConvertStatus);

const handleAutoConvert = () => {
  if (isConvertToSejin) {
    timeConverted__time.value = toSejinStandard(timeInputed__time.value);
  } else {
    timeInputed__time.value = toNormalStandard(timeConverted__time.value);
  }
};

setInterval(handleAutoConvert, 50);
