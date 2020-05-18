using Microsoft.EntityFrameworkCore;
using System;
namespace FakeBackend
{
    public class OldSearchResult
    {
        public string kunnr { get; set; }                   //     "kunnr": "0000013272        ",
        public string matnr { get; set; }                   //     "matnr": "000000000000100582",
        public string descripcion { get; set; }             //     "descripcion": "IBU-BUSCAPINA X 10 COMP.                ",
        public string matkl { get; set; }                   //     "matkl": "F00000007",
        public string laboratorioID { get; set; }           //     "laboratorioID": "0000100180",
        public string spart { get; set; }                   //     "spart": "ME",
        public double precio { get; set; }                  //     "precio": 6.33,
        public double precioVta { get; set; }               //     "precioVta": 6.33,
        public string estadoStock { get; set; }             //     "estadoStock": "F",
        public string estadoStockDetalle { get; set; }      //     "estadoStockDetalle": "Falta                    ",
        public int cantPedida { get; set; }                 //     "cantPedida": 0,
        public string codigoBarra { get; set; }             //     "codigoBarra": "7795304085893     ",
        public double precio_ConDesc { get; set; }          //     "precio_ConDesc": 5.95,
        public bool tieneOferta { get; set; }               //     "tieneOferta": false,
        public bool tieneTransfer { get; set; }             //     "tieneTransfer": false,
        public bool tieneEscala { get; set; }               //     "tieneEscala": false,
        public string escalaObtenida { get; set; }          //     "escalaObtenida": "", string?
        public string leyendaDescuento { get; set; }        //     "leyendaDescuento": "                    ",
        public int compraMinima_UNID { get; set; }          //     "compraMinima_UNID": 0,
        public int compraMinima_Oferta { get; set; }        //     "compraMinima_Oferta": 0,
        public string laboratorioNombre { get; set; }       //     "laboratorioNombre": "BOEH.INGEL.                        ",
        public string tipoCodigoBarraViejo { get; set; }    //     "tipoCodigoBarraViejo": "H",
        public string tipoCodigoBarraNuevo { get; set; }    //     "tipoCodigoBarraNuevo": "HE",
        public string iva { get; set; }                     //     "iva": "0",
        public string datbi { get; set; }                   //     "datbi": null,
        public int ventaMaxima { get; set; }                //     "ventaMaxima": 0,
        public double precioSugerido { get; set; }          //     "precioSugerido": 0.0,
        public int pedTempID { get; set; }                  //     "pedTempID": 0,
        public string fechaRegistro { get; set; }           //     "fechaRegistro": null,
        public int pedRecordatorio { get; set; }            //     "pedRecordatorio": 0,
        public string mfrgR_REFRIGERADO { get; set; }       //     "mfrgR_REFRIGERADO": null,
        public string producto_NUEVO { get; set; }          //     "producto_NUEVO": null,
        public int unidadesConsumidas { get; set; }         //     "unidadesConsumidas": 0,
        public int limiteUnidadesConsumidas { get; set; }   //     "limiteUnidadesConsumidas": 0,
        public string nomAcumuladoTransfers { get; set; }   //     "nomAcumuladoTransfers": "                    ",
        public string trazable { get; set; }                //     "trazable": " ",
        public string estadoMaterialID { get; set; }        //     "estadoMaterialID": " ",
        public int controlprocesoMAT { get; set; }          //     "controlprocesoMAT": 3072,
        public int cantReg { get; set; }                    //     "cantReg": 1,
        public double ivA_PORC { get; set; }                //     "ivA_PORC": 0.0,
        public double rentabilidad { get; set; }            //     "rentabilidad": 0.0,
        public int ordenSalida { get; set; }                //     "ordenSalida": 1,
        public string zterm { get; set; }                   //     "zterm": null,
        public double totales_ConDesc { get; set; }         //     "totales_ConDesc": 0.0,
        public double totales_SinDesc { get; set; }         //     "totales_SinDesc": 0.0,
        public int totales_Unidades { get; set; }           //     "totales_Unidades": 0,
        public int totales_Lineas { get; set; }             //     "totales_Lineas": 0,
        public double totales_DescObtenido { get; set; }    //     "totales_DescObtenido": 0.0,
        public int paq { get; set; }                        //     "paq": "20",
        public double precio_Incluye_IVA { get; set; }      //     "precio_Incluye_IVA": 0.0,
        public bool tieneImagen { get; set; }               //     "tieneImagen": false
        public OldSearchResult() {

        }
    }
}