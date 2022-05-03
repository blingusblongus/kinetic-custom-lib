export const addBackground = {
  id: 'custom_canvas_background_color',
  beforeDraw: chart => {
    const { left, top, width, height } = chart.chartArea;
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';

    var gradient = ctx.createLinearGradient(0, top, 0, height);

    // Add three color stops
    gradient.addColorStop(0.35, 'rgba(255,255,255,.2');
    gradient.addColorStop(1, 'rgba(190,201,224,.39');
    ctx.fillStyle = gradient;

    ctx.fillRect(left, top, width, height);
    ctx.restore();
  },
};
