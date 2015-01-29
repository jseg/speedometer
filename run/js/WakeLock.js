function WakeLock () {

    var lockFn, unlockFn

    var lock

    if (navigator.requestWakeLock) {
        lockFn = function () {
            lock = navigator.requestWakeLock('screen')
        }
        unlockFn = function () {
            lock.unlock()
        }
    } else {
        lockFn = unlockFn = function () {}
    }

    return {
        lock: lockFn,
        unlock: unlockFn,
    }

}
