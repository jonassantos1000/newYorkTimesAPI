function getParams(){
    return "dTN9G7edmXTDAsHKJgXlKqDnmL5pQ9se";
}

function getAPICarousel(params){
    var url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${params}`
    fetch(url)
        .then(res => res.json())
        .then(
            (resultado)=>{
                createCarousel(resultado.results);              
            });
}

function getAPIArticle(params){
    var url = `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${params}`
    fetch(url)
        .then(res => res.json())
        .then(
            (resultado)=>{
                console.log(resultado.results);
                createArticle(resultado.results);         
            });
}

function createCarousel(element){
    let titulo = document.querySelector(".titulo-principal");
    let descricao = document.querySelector(".descricao-principal");

    if(element[1].multimedia[0].url){
        titulo.innerHTML = element[1].title;
        descricao.innerHTML= element[1].abstract;
        car = document.querySelector('.imagem1');
        car.src= element[1].multimedia[0].url

        titulo= document.querySelector('.titulo-secundario')
        descricao= document.querySelector('.descricao-secundario')
        titulo.innerHTML = element[2].title
        descricao.innerHTML= element[2].abstract
        car2 = document.querySelector('.imagem2');
        car2.src= element[2].multimedia[0].url
    }
}

function createArticle(element){
    element.forEach(element => {
        let cont = 0;
        let divConteudo = document.querySelector('.conteudo');
        
        let divCard = document.createElement('div');
        let cardBody = document.createElement('div');
        let img = document.createElement('img');
        let tituloCard = document.createElement('h4');
        let descricao = document.createElement('p');
        let link = document.createElement('a');

        divCard.classList.add('card', 'd-flex', 'w-25');
        cardBody.classList.add('card-body');
        img.classList.add('card-img-top', 'imagem-card', 'p-1');
        tituloCard.classList.add('card-title')
        descricao.classList.add('card-text');
        
        img.src=element.multimedia[cont].url;
        tituloCard.innerHTML = element.title;
        descricao.innerHTML= element.abstract;
        link.href= element.url;
        
        cardBody.append(tituloCard);
        cardBody.append(descricao);
        link.append(img);

        divCard.append(link);
        divCard.append(cardBody);

        divConteudo.append(divCard);
    });
}

getAPICarousel(getParams());
getAPIArticle(getParams());