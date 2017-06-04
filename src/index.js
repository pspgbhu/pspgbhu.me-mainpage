import './reset.css';
import './style.css';
import curvejs from 'curvejs';

const  { Stage, Word, Curve, motion } = curvejs;

const util = {

    random: function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1))
    },

    randomColor: function () {
        return ['#22CAB3', '#90CABE', '#A6EFE8', '#C0E9ED', '#C0E9ED', '#DBD4B7', '#D4B879', '#ECCEB2', '#F2ADA6', '#FF7784'][util.random(0, 9)];
    },

    randomSpeed: function () {
        return (Math.random() > 0.5 ? 1 : -1) * Math.random() * 2
    }
}

const words = {
  p: [
    [57, 59, 46, 100, 42, 139, 41, 160],
    [57, 59, 94, 59, 107, 98, 48, 95],
  ],
  g: [
    [81, 59, 78, 91, 71, 194, 29, 147],
    [81, 59, 40, 34, 19, 110, 70, 94],
  ],
  b: [
    [41, 27, 33, 95, 33, 133, 34, 134],
    [42, 76, 102, 82, 71, 141, 37, 131],
  ],
  h: [
    [33, 28, 46, 64, 41, 137, 23, 125],
    [39, 78, 101, 65, 54, 128, 70, 134],
  ],
}

class CustomWord {
  constructor(word, options) {
    options = Object.assign({
        x:0,y:0,color:'white'
    },options);

    this.word = word;
    this.color = options.color;
    this.x = options.x;
    this.y = options.y;
    this.data = options.data
    this.motion = options.motion

    this.points = words[word];

    this._init();
  }

  _init() {
    this.points.forEach(item => {
      stage.add(new Curve({
          x: this.x,
          y: this.y,
          points: item,
          color: this.color,
          motion: this.motion,
          data: this.data,
      }));
    })
  }
}

let lineCount = 10,
    random = util.random,
    randomColor = util.randomColor,
    randomSpeed = util.randomSpeed,
		canvas = document.getElementById('canvas'),
 		stage = new Stage(canvas),
    ctx = canvas.getContext('2d');


new CustomWord('p', {
  x: 160,
  color: util.randomColor(),
  motion: motion.dance,
  data: {angle: 0, r:5 ,step:Math.PI / 50 },
});

stage.add(new Word('s',{
  color: util.randomColor(),
  x:245,
  motion: motion.dance,
  data: {angle: 0, r:5 ,step:Math.PI / 40 }
}))


new CustomWord('p', {
  x: 330,
  color: util.randomColor(),
  motion: motion.dance,
  data: {angle: 0, r:5 ,step:Math.PI / 50 },
});

new CustomWord('g', {
  x: 415,
  color: util.randomColor(),
  data: {angle: 0, r:5 ,step:Math.PI / 70 },
  motion: motion.dance,
});

new CustomWord('b', {
  x: 500,
  color: util.randomColor(),
  data: {angle: 0, r:5 ,step:Math.PI / 50 },
  motion: motion.dance,
});

new CustomWord('h', {
  x: 585,
  color: util.randomColor(),
  data: {angle: 0, r:5 ,step:Math.PI / 100 },
  motion: motion.dance,
});

stage.add(new Word('u',{
  color: util.randomColor(),
  x: 670,
  motion: motion.dance,
  data: {angle: 0, r:5 ,step:Math.PI / 50 }
}))

function tick(){
    stage.update()
    requestAnimationFrame(tick)
}

tick();

ctx.scale(2, 2);
