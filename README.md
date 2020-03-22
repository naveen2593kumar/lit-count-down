# lit-count-down-timer
This is a countdown timer web component based on LitElement Library

`<lit-count-down-timer id="timer"></lit-count-down-timer>`

can use styles like :
```
 <style>
    lit-count-down-timer {
      padding: 10px;
      font-size: 20px;
      line-height: 20px;
    }

    lit-count-down-timer,
    lit-count-down-timer[status='not_started'] {
      color: red;
      border: 1px solid red;
    }

    lit-count-down-timer[status='running'] {
      color: blue;
      border: 1px solid blue;
    }

    lit-count-down-timer[status='paused'] {
      color: orange;
      border: 1px solid orange;
    }

    lit-count-down-timer[status='completed'] {
      color: green;
      border: 1px solid green;
    }
  </style>
  ```
  use component by exposed functions
  ```
  <script>
    const timer = document.getElementById('timer');

    timer.addEventListener('count-down-completed', () => {
      console.log('Countdown Completed');
    });

    timer.addEventListener('count-down-reset', () => {
      console.log('Countdown Reset');
    });

    function start() {
      timer.start();
    }

    function pause() {
      timer.pause();
    }

    function reset() {
      timer.reset();
    }

    function addTime(time) {
      timer.addTime(time);
    }
  </script>
  ```