
/**
 * A countdown until check in is closed.
 * @param {useState} setTimer  A useState react function
 * @param {boolean} checkInControl A value for checking the state
 * @returns Using setInterval countsdown the timer
 */
export const countdown =(setTimer,checkInControl)=>{

    let interval = setInterval(() => {
        //add the time until it locks it out
        //get current time and compare to start time gotten from backend
        //
        //    
        // console.log((startTime- currentTime));
        //console.log(startTime);
        //console.log(currentTime);
        setTimer(lastTimerCount => {
            lastTimerCount <= 1 && clearInterval(interval)
            return lastTimerCount - 1
        })
    }, 1000) //each count lasts for a second
    //cleanup the interval on complete
    //if checkedIn  return ()=>clearInterval(interval);
    //in the useEffect array listen for it maybe
    if(checkInControl) return ()=>clearInterval(interval);
    return () => clearInterval(interval)

}