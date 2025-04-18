const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOku);

function gorevSilTamamla(e) {
    const tiklanilanEleman = e.target;

    if (tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')) {
       
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
    }
    if (tiklanilanEleman.classList.contains('gorev-btn-sil')) {
        
        if (confirm('Emin misiniz')) {
            tiklanilanEleman.parentElement.classList.toggle('kaybol');
            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            
            localStorageSil(silinecekGorev);
    
            tiklanilanEleman.parentElement.addEventListener('transitionend', function () {
                tiklanilanEleman.parentElement.remove();
            });
        }
    }
}

function gorevEkle(e) {
    e.preventDefault();

    if (yeniGorev.value.length > 0) {
        gorevItemOlustur(yeniGorev.value);
        //localstoragea kaydet
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = '';
    } else {
        alert('Boş görev tanımı olmaz');
    } 
}

function localStorageArrayeDonustur() {
    let gorevler;

    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    return gorevler;
}

function localStorageKaydet(yeniGorev) {
    let gorevler = localStorageArrayeDonustur();
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function localStorageOku() {
    let gorevler = localStorageArrayeDonustur();

    gorevler.forEach(function (gorev) {
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev) {
     //div
     const gorevDiv = document.createElement('div');
     gorevDiv.classList.add('gorev-item');
     
     //li
     const gorevLi = document.createElement('li');
     gorevLi.classList.add('gorev-tanim');
     gorevLi.innerText = gorev;
     gorevDiv.appendChild(gorevLi);
 
     //tamamlandi
     const gorevTamamBtn = document.createElement('button');
     gorevTamamBtn.classList.add('gorev-btn');
     gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
     gorevTamamBtn.innerHTML = '<i class="far fa-check-square"></i>';
     gorevDiv.appendChild(gorevTamamBtn);
 
     //sil
     const gorevSilBtn = document.createElement('button');
     gorevSilBtn.classList.add('gorev-btn');
     gorevSilBtn.classList.add('gorev-btn-sil');
     gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
     gorevDiv.appendChild(gorevSilBtn);

     //ul'ye olusturdugumuz divi ekleyelim
     gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev) {
    let gorevler = localStorageArrayeDonustur();

    //splice ile item sil
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex, 1);

    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}