
/**
 * Provided an array returns the nearest lecture based on time between 0 and 30 minutes.
 * @param {array} lectures Provide an array of lectures
 */
export const getNearestLecture = (lectures) => {
    let nearestLecture;
    let timer;
    lectures.map((lecture) => {
        console.log(lecture.startDateAndTime);
        timer=(new Date(lecture.startDateAndTime).getTime() - new Date().getTime())/1000;
        if( timer >0 || timer < 1800*10){
            nearestLecture= lecture
        }
    });
    return {nearestLecture,timer};
  }