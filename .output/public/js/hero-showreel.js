// Rose Laboratories — hero showreel
// Plays a sequence of product films, one after another, on loop,
// inside a single video frame (replaces the old static floating crest).
(function(){
  var video = document.getElementById('heroShowreel');
  if(!video) return;
  var label = document.getElementById('heroShowreelLabel');
  var source = video.querySelector('source');

  var playlist = [
    { src: 'assets/videos/pd-090-instagram-ad.mp4',           label: 'PD 0.90 — Digestive Relief Drops' },
    { src: 'assets/videos/haven-massage-oil.mp4',            label: 'Haven Massage Oil — Aromatherapy' },
    { src: 'assets/videos/forest-rose-baby-massage-oil.mp4', label: 'Forest Rose Baby Massage Oil' },
    { src: 'assets/videos/haven-hair-lotion.mp4',            label: 'Haven Bhringraj Hair Lotion' }
    // Add more videos here as they're ready, e.g.:
    // { src: 'assets/videos/your-file.mp4', label: 'Your Product Name' },
  ];

  var idx = 0;
  var FADE_MS = 380;

  function show(i){
    idx = i % playlist.length;
    var item = playlist[idx];
    source.src = item.src;
    video.load();
    if(label){ label.textContent = item.label; }
    video.play().catch(function(){ /* autoplay may be blocked; ignore */ });
    // fade the new clip in
    requestAnimationFrame(function(){ video.classList.remove('vf-fade'); });
  }

  video.addEventListener('ended', function(){
    video.classList.add('vf-fade');
    setTimeout(function(){ show(idx + 1); }, FADE_MS);
  });

  // If a clip ever fails to load, skip ahead rather than freezing the frame.
  video.addEventListener('error', function(){
    setTimeout(function(){ show(idx + 1); }, 200);
  });

  show(0);
})();
