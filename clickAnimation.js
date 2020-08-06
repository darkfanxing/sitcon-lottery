const COLORS = {
  GREEN:    '#77B55A',
  WHITE:    'white',
}

const bgBurst = new mojs.Burst({
  left: 0, top: 0,
  count:  3,
  radius: 0,
  degree: 0,
  isShowEnd: false,
  children: {
    fill:           [ COLORS.GREEN, COLORS.WHITE ],
    radius:         'stagger(200, 2)',
    scale:          { .1 : .15 },
    duration:       325,
    delay:          'stagger(100)',
    easing:         [ 'cubic.out', 'cubic.out', 'cubic.out' ],
    isForce3d:      true,
  }
});

const burst1 = new mojs.Burst({
  left: 0, top: 0,
  count:    5,
  radius:   { 0: 150 },
  children: {
    fill:   'white',
    shape:  'line',
    stroke: [ COLORS.WHITE, COLORS.GREEN ],
    strokeWidth: 12, 
    radius: 'rand(10, 20)',
    radiusY: 0,
    scale: { 0.8 : 0 },
    pathScale: 'rand(.5, 1)',
    degreeShift: 'rand(-360, 360)',
    isForce3d: true,
  }
});

const burst2 = new mojs.Burst({
  top: 0, left: 0,
  count:  3,
  radius: { 0: 150 },
  children: {
    shape:      [ 'circle', 'rect' ],
    points:     5,
    fill:       [ "black", COLORS.GREEN ],
    radius:     'rand(10, 20)',
    scale:      { 0.8: 0 },
    pathScale:  'rand(.5, 1)',
    isForce3d:  true
  }
});

const CIRCLE_OPTS = {
  left: 0, top: 0,
  fill:     COLORS.GREEN,
  scale:    { .1: .5 },
  opacity: { 1: 0 },
  isForce3d: true,
  isShowEnd: false
}

const circle1 = new mojs.Shape({
    ...CIRCLE_OPTS,
    radius:   10,
  });

const circle2 = new mojs.Shape({
  ...CIRCLE_OPTS,
  radius:   30,
  easing: 'cubic.out',
  delay: 150,
});
  
document.addEventListener( 'click', function (e) {
  burst1
    .tune({ x: e.pageX, y: e.pageY })
    .generate()
    .replay();
  
  burst2
    .tune({ x: e.pageX, y: e.pageY })
    .generate()
    .replay();
  
  circle1
    .tune({ x: e.pageX, y: e.pageY })
    .replay();
  
  circle2
    .tune({ x: e.pageX, y: e.pageY })
    .replay();
  
  bgBurst
    .tune({ x: e.pageX, y: e.pageY })
    .replay();
});