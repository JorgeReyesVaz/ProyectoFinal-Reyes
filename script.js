 let CostoRecibo = 0
 let ConsumoProm = 0
 let PanelesNecesarios = 0
 let CostoEstimadoEquipo = 0
 const KW= 4.5
 const prod = 270
 let meses = 0
 let interes = .01
 let capPanel= 0
 let costPanel = 0
 let costTotal = 0
 let instalacion = 300

//Paneles información 
let Panel = function (nombre, capacidad, precio) {
    this.nombre = nombre,
    this.capacidad = capacidad,
    this.precio = precio
}

let panel1 = new Panel ("jinko", "500", 2500)
let panel2 = new Panel ("jinko", "550", 2800)
let panel3 = new Panel ("ja", "500", 2200)
let panel4 = new Panel ("ja", "580", 2550)
let panel5 = new Panel ("qcell", "510", 2100)
let panel6 = new Panel ("qcell", "560", 2750)
let panel7 = new Panel ("renesola", "500", 2350)
let panel8 = new Panel ("renesola", "550", 2900)
let panel9 = new Panel ("solarever", "550", 2400)
let panel10 = new Panel ("solarever", "590", 3100)
let listaPanel = [panel1,panel2,panel3,panel4,panel5,panel6,panel7,panel8,panel9,panel10]

//Inversores información 
let Inversor = function (nombre, capacidad, precio) {
    this.nombre = nombre,
    this.capacidad = capacidad,
    this.precio = precio
}

let inversor1 = new  Inversor ("growatt", 1500, 18000)
let inversor2 = new  Inversor ("growatt", 2000, 22000)
let inversor3 = new  Inversor ("growatt", 3000, 27000)
let inversor4 = new  Inversor ("growatt", 5000, 34500)
let inversor5 = new  Inversor ("growatt", 6000, 43000)
let inversor6 = new  Inversor ("growatt", 7000, 50500)
let inversor7 = new  Inversor ("growatt", 8000, 62500)
let inversor8 = new  Inversor ("growatt", 9000, 70000)
let inversor9 = new  Inversor ("growatt", 10000, 89000)
let inversor10 = new Inversor ("growatt", 15000, 113000)
let listaInversor = [inversor1,inversor2,inversor3,inversor4,inversor5,inversor6,inversor7,inversor8,inversor9,inversor10]

 //Se va a obtener el valor del recibo del html
    let button = document.getElementById("button")
    button.addEventListener("click",costoRecibo)
    function costoRecibo(){
        let Recibo = document.getElementById("CostoRecibo").value
        CostoRecibo = parseInt(Recibo)
        let a = CostoRecibo * 0 
        if (a != 0){
            alert('Ese no es un número, por favor ungresa el costo de tu recibo')
        }else {
            
            alert('Costo de recibo agregado')
            calcularKw()
        }
     }
    
     //Con ese valor lo comvertimos para guardarlo en CostoRecibo y llamamos a la funcion calcularKw
    
    function calcularKw(){
        ConsumoProm = CostoRecibo / KW
        ConsumoProm = Math.round(ConsumoProm)
        document.getElementById('ConsumoProm').textContent = "Tienes un consumo promedio de: " +ConsumoProm +"Kw"
        calcularPaneles()
    }

    //Ya tenemos el consumo del cliente, ahora debemos seleccionar que panel solar quiere

     function calcularPaneles(){
        let filtrar = prompt("Ingresa la capacidad deseada de tus paneles solares, pueden ser de 500w, 510w, 550, 560w, 580w o 590w").trim()
        let resultado = listaPanel.filter( (x)=>x.capacidad.includes(filtrar))
        
        if (resultado.length> 0 ){
            console.table(resultado)
            let filtrar2 =prompt("Ingresa el nombre del panel solar que te interesa de los mostrados en consola").toUpperCase().trim()
            let resultado2 = resultado.filter( (x)=>x.nombre.toUpperCase().trim().includes(filtrar2))
            if(resultado2.length> 0 ){
                console.table(resultado2)
                console.log(resultado2[0].capacidad)
                console.log(resultado2[0].precio)
                capPanel = resultado2[0].capacidad
                costPanel = resultado2[0].precio
            }else{
                alert("Por favor selecciona un nombre correcto")
            }
        }else{
            alert("Por favor selecciona una capacidad correcta")
            return
        }

        let panelMes = capPanel * prod
        panelMes = panelMes/ 1000
        PanelesNecesarios = ConsumoProm / panelMes
        PanelesNecesarios = Math.round(PanelesNecesarios)
        CostoEstimadoEquipo = PanelesNecesarios * costPanel
        CostoEstimadoEquipo = Math.round(CostoEstimadoEquipo)
        
        document.getElementById('PanelesNecesarios').textContent = "Necesitarías un total de: " +PanelesNecesarios +"Paneles Solares de " +capPanel +"W"

        let invness = PanelesNecesarios * capPanel
        let filtrarInv = listaInversor.filter((x)=> x.capacidad == invness || x.capacidad > invness)
        if (filtrarInv.length>0){
            let costInv = filtrarInv[0].precio
            console.table(filtrarInv)
            instalacion = PanelesNecesarios * instalacion
            costTotal = costInv + CostoEstimadoEquipo + instalacion
        }else{
            invness = invness / 2 
            let filtrarInv2 = listaInversor.filter((x)=> x.capacidad == invness || x.capacidad > invness)
            if (filtrarInv2.length>0){
                console.table(filtrarInv2)
                let costInv2 = filtrarInv2[0].precio * 2
                instalacion = PanelesNecesarios * instalacion
                costTotal = costInv2 + CostoEstimadoEquipo + instalacion
            }else{
                alert("Costo de recibo muy elevado, se necesita realizar una cotización a la medida, por favor contactanos")
                return
            }
            
        }

        document.getElementById('CostoEstimadoEquipo').textContent = "Tiene un costo estimado de " +costTotal +"mnx"
        document.getElementById('bottonFin').style.display = "block"

    }
    
    function mostrarFin() {
        document.getElementById('informacion').style.display = "none"
        document.getElementById('financiamiento').style.display = "block"
        document.getElementById('planFin').style.display = "block"
    }
    
    //Calculamos con unpromedio de 4.5 pesos por w, costo del recibo / 4.5 y nos dara el consumo promedio
    // Con ese consumo lo dividimos entre 148.5 y nos da el numero de paneles
    let buttonFin = document.getElementById("buttonFin")
    buttonFin.addEventListener("click", financiamiento)
    function financiamiento(){
        document.getElementById("divTabla").innerHTML="";
        let costoTotal = 0
        interes = 0
        meses = document.getElementById("mesesFin").value
        if (meses == 12){
            meses = 12
            interes = interes * meses
            interes = 1 + interes
            console.log(interes);
            costoTotal = costTotal * interes
            costoTotal = Math.round(costoTotal)
            console.log(costoTotal);
            let anticipo = .2
            anticipo = costoTotal * anticipo
            anticipo = Math.round(anticipo)
            let restanteMeses = (costoTotal - anticipo)/meses
            restanteMeses = Math.round(restanteMeses)
            document.getElementById('plantitulo').textContent = "Tu plan de financiaiento a " +meses +" meses"
            document.getElementById('anticipo').textContent = "Pagarías un anticipo de " +anticipo +" mnx"
            document.getElementById('mensualidad').textContent = "Un pago mensual de " +restanteMeses +"mnx"
                        
            const contenedor = document.getElementById("divTabla")
            const tabla = document.createElement("table")
            tabla.className += "table table-striped"
            let thead = document.createElement("thead")
            let tr = document.createElement("tr")
            let th = document.createElement("th")
            th.setAttribute("scope","col")
            let thText = document.createTextNode("Meses")
            th.appendChild(thText)
            tr.appendChild(th);
            th = document.createElement("th");
            thText = document.createTextNode("Cantidad");
            th.appendChild(thText);
            tr.appendChild(th);
            thead.appendChild(tr)
            tabla.appendChild(thead);
                let a = meses + 1
                console.log(meses);
                console.log(a)
            let tbody = document.createElement("tbody")
                for (let i = 1; i < a; i++) {
                    
                    let tr = document.createElement("tr")
                    let th = document.createElement("th")
                    th.setAttribute("scope","row")
                    let thText = document.createTextNode(i)
                    th.appendChild(thText)
                    tr.appendChild(th);
                    let td = document.createElement("td")
                    let tdText = document.createTextNode("$"+restanteMeses);
                    td.appendChild(tdText)
                    tr.appendChild(td)
                    tbody.appendChild(tr);
                }  
                tabla.appendChild(tbody);                    
            contenedor.appendChild(tabla);   
        }else if (meses == 24){
            meses = 24
            interes = interes * meses
            interes = 1 + interes
            console.log(interes);
            let costoTotal = costTotal * interes
            costoTotal = Math.round(costoTotal)
            console.log(costoTotal);
            let anticipo = .2
            anticipo = costoTotal * anticipo
            anticipo = Math.round(anticipo)
            let restanteMeses = (costoTotal - anticipo)/meses
            restanteMeses = Math.round(restanteMeses)
            document.getElementById('plantitulo').textContent = "Tu plan de financiaiento a " +meses +" meses"
            document.getElementById('anticipo').textContent = "Pagarías un anticipo de " +anticipo +" mnx"
            document.getElementById('mensualidad').textContent = "Un pago mensual de " +restanteMeses +"mnx"
                        
            const contenedor = document.getElementById("divTabla")
            const tabla = document.createElement("table")
            tabla.className += "table table-striped"
            let thead = document.createElement("thead")
            let tr = document.createElement("tr")
            let th = document.createElement("th")
            th.setAttribute("scope","col")
            let thText = document.createTextNode("Meses")
            th.appendChild(thText)
            tr.appendChild(th);
            th = document.createElement("th");
            thText = document.createTextNode("Cantidad");
            th.appendChild(thText);
            tr.appendChild(th);
            thead.appendChild(tr)
            tabla.appendChild(thead);
                let a = meses + 1
                console.log(meses);
                console.log(a)
            let tbody = document.createElement("tbody")
                for (let i = 1; i < a; i++) {
                    
                    let tr = document.createElement("tr")
                    let th = document.createElement("th")
                    th.setAttribute("scope","row")
                    let thText = document.createTextNode(i)
                    th.appendChild(thText)
                    tr.appendChild(th);
                    let td = document.createElement("td")
                    let tdText = document.createTextNode("$"+restanteMeses);
                    td.appendChild(tdText)
                    tr.appendChild(td)
                    tbody.appendChild(tr);
                }  
                tabla.appendChild(tbody);                    
            contenedor.appendChild(tabla);
        }else if (meses == 36){
            meses = 36
            interes = interes * meses
            interes = 1 + interes
            console.log(interes);
            let costoTotal = costTotal * interes
            costoTotal = Math.round(costoTotal)
            console.log(costoTotal);
            let anticipo = .2
            anticipo = costoTotal * anticipo
            anticipo = Math.round(anticipo)
            let restanteMeses = (costoTotal - anticipo)/meses
            restanteMeses = Math.round(restanteMeses)
            document.getElementById('plantitulo').textContent = "Tu plan de financiaiento a " +meses +" meses"
            document.getElementById('anticipo').textContent = "Pagarías un anticipo de " +anticipo +" mnx"
            document.getElementById('mensualidad').textContent = "Un pago mensual de " +restanteMeses +"mnx"
                        
            const contenedor = document.getElementById("divTabla")
            const tabla = document.createElement("table")
            tabla.className += "table table-striped"
            let thead = document.createElement("thead")
            let tr = document.createElement("tr")
            let th = document.createElement("th")
            th.setAttribute("scope","col")
            let thText = document.createTextNode("Meses")
            th.appendChild(thText)
            tr.appendChild(th);
            th = document.createElement("th");
            thText = document.createTextNode("Cantidad");
            th.appendChild(thText);
            tr.appendChild(th);
            thead.appendChild(tr)
            tabla.appendChild(thead);
                let a = meses + 1
                console.log(meses);
                console.log(a)
            let tbody = document.createElement("tbody")
                for (let i = 1; i < a; i++) {
                   
                    let tr = document.createElement("tr")
                    let th = document.createElement("th")
                    th.setAttribute("scope","row")
                    let thText = document.createTextNode(i)
                    th.appendChild(thText)
                    tr.appendChild(th);
                    let td = document.createElement("td")
                    let tdText = document.createTextNode("$"+restanteMeses);
                    td.appendChild(tdText)
                    tr.appendChild(td)
                    tbody.appendChild(tr);
                }  
                tabla.appendChild(tbody);                    
            contenedor.appendChild(tabla);
        }else{
            alert("Por favor ingresa un financiamiento valido, puede ser 12, 24 o 36 meses")
        }
    }
     
    

