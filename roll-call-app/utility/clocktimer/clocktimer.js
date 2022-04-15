

export const timer =(setTimer,checkInControl)=>{

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