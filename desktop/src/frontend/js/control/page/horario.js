document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    //const instances = M.Carousel.init(carousel, {});
    periodoDao.select().then((res) => {
        let tmp = "";
        for (let i of res) {
            let random = parseInt((Math.random(1) * 22) + 1);
            horarioDao.selectByIdPeriodo(i.id_periodo).then((res) => {
                if (res.length !== 0) {
                    tmp += `
                        <a class="carousel-item" href="#carrousel_2">
                            <div class="content">
                                <img class="img" src="./../../assets/img/page/horario/${random}.jpg">
                                <div class="options">
                                    <span>${i.nombre}</span>
                                    <div class="buttons">
                                        <button class="waves-effect waves-light btn">Ver</button>
                                        <button class="waves-effect waves-light btn">Editar</button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    `;
                } else {
                    tmp += `
                        <a class="carousel-item" href="#carrousel_2">
                            <div class="content">
                                <img class="img" src="./../../assets/img/page/horario/${random}.jpg">
                                <div class="options">
                                    <span>${i.nombre}</span>
                                    <div class="buttons">
                                        <button class="waves-effect waves-light btn">Generar</button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    `;
                }
                carousel.innerHTML = tmp;
                M.Carousel.init(carousel, {});
            });
        }
    });
});