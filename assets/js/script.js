tagHtml = {
    inputCidade: document.getElementById('nome-local'),
    btnEnviar: document.getElementById('botao'),
    tabLocalidade: document.getElementById('localidade'),
    tabDescricao: document.getElementById('descricao'),
    tabTemperatura: document.getElementById('temperatura'),
    tabSunset: document.getElementById('sunset'),
    tabSunrise: document.getElementById('sunrise'),
    tabClimaImagem: document.getElementById('imagem-clima'),
    tabIMG: document.getElementById('clima')
}


const getWeather = async(field) =>{
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${field}&appid=653cc69cea4541ce09bedd04819eb5bb&lang=pt_br&units=metric`;
    const response = await fetch(weatherAPI);
    if(response.status === 200){
        const data = await response.json();
        return data;
    }
}

const getHour = (timestamp) =>{
    const dateFormat = new Intl.DateTimeFormat('pt-BR', {
        timeStyle: 'short',
        timeZone: 'America/Sao_Paulo'
    });
    return dateFormat.format(new Date(timestamp * 1000));
}

const getImgCondition = async(field) =>{
    const data = await getWeather(field);
    tagHtml.tabIMG.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

const showWeather = async(field) =>{
    const data = await getWeather(field);
    tagHtml.tabLocalidade.innerHTML = 'Localidade: ' + `${data.name}, ${data.sys.country}`;
    tagHtml.tabDescricao.innerHTML = 'Condições Climáticas:<br>' + `${data.weather[0].description}`;
    tagHtml.tabTemperatura.innerHTML = 'Temperatura: ' + `${Number(data.main.temp).toFixed(1)}º C`;
    tagHtml.tabSunrise.innerHTML = '&#127749;Nascer do Sol: ' + `${getHour(data.sys.sunrise)}`;
    tagHtml.tabSunset.innerHTML = '&#127751;Por do Sol: ' + `${getHour(data.sys.sunset)}`;
}

const getImgWeather = async(field) =>{
    const data = await getWeather(field);
    if(data.weather[0].main === "Clouds"){
        tagHtml.tabClimaImagem.src = 'assets/img/nublado.jpg';
    }else if(data.weather[0].main === 'Clear'){
        tagHtml.tabClimaImagem.src = 'assets/img/ensolarado.jpg';
    }else if(data.weather[0].main === 'Rain'){
        tagHtml.tabClimaImagem.src = 'assets/img/chovendo.jpg';
    }
}

tagHtml.btnEnviar.addEventListener('click', (event=>{
    event.preventDefault();
    showWeather(tagHtml.inputCidade.value);
    getImgWeather(tagHtml.inputCidade.value);
    getImgCondition(tagHtml.inputCidade.value);
    document.querySelector('.list-group-flush').style.display = "block";
}));