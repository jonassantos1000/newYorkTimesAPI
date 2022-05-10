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
                createArticle(resultado.results);         
            });
}

function validaRetornoAPI(element, indice=0){
    let i = indice;
    console.log(indice);
    console.log(element);
    while (element[i].multimedia == false){
        i+=1;
    }
    return i;
}

function createCarousel(element){
    let titulo = document.querySelector(".titulo-principal");
    let descricao = document.querySelector(".descricao-principal");
    let indice= validaRetornoAPI(element);

    titulo.innerHTML = element[indice].title;
    descricao.innerHTML= element[indice].abstract;
    car = document.querySelector('.imagem1');
    car.src= element[indice].multimedia[0].url;
    indice= validaRetornoAPI(element, indice=+5);
    
    titulo= document.querySelector('.titulo-secundario')
    descricao= document.querySelector('.descricao-secundario')
    titulo.innerHTML = element[indice].title
    descricao.innerHTML= element[indice].abstract
    car2 = document.querySelector('.imagem2');
    car2.src= element[indice].multimedia[0].url
}

function createArticle(element){
    element.forEach(element => {
        if (element.abstract){
            let divConteudo = document.querySelector('.conteudo');
            
            let divCard = document.createElement('div');
            let cardBody = document.createElement('div');
            let img = document.createElement('img');
            let tituloCard = document.createElement('h4');
            let descricao = document.createElement('p');
            let link = document.createElement('a');

            divCard.classList.add('card', 'd-flex');
            cardBody.classList.add('card-body');
            img.classList.add('card-img-top', 'imagem-card', 'p-1');
            tituloCard.classList.add('card-title')
            descricao.classList.add('card-text');
            
            img.src=element.multimedia[0].url;
            tituloCard.innerHTML = element.title;
            descricao.innerHTML= element.abstract;
            link.href= element.url;
            
            cardBody.append(tituloCard);
            cardBody.append(descricao);
            link.append(img);

            divCard.append(link);
            divCard.append(cardBody);

            divConteudo.append(divCard);
        }
    });
}

getAPICarousel(getParams());
getAPIArticle(getParams());