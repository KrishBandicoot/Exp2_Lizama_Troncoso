
  document.querySelectorAll('.card').forEach(function(card) {
      const nombre = encodeURIComponent(card.querySelector('.card-title').textContent);
      const foto = encodeURIComponent(card.querySelector('.card-img-top').getAttribute('src'));
      const precio = encodeURIComponent(card.querySelector('.price-badge').textContent.replace('$','').replace('.',''));
      const descripcion = encodeURIComponent(card.querySelector('.card-text').textContent);
      const link = card.querySelector('a.btn-outline-primary');
      link.setAttribute('href', `detalleProducto.html?nombre=${nombre}&foto=${foto}&precio=${precio}&descripcion=${descripcion}`);
  });
