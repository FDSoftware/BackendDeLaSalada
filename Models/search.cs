using Microsoft.EntityFrameworkCore;
using System;
namespace FakeBackend
{
    public class SearchResult
    {
        //  base producto
        public int kunnr { get; set; }
        public int matnr { get; set; }
        public string matkl { get; set; }
        public string codebar { get; set; }
        public string productName { get; set; }
        // data sobre lab
        public string labName { get; set; }
        public int labID { get; set; }
        // precio | descuentos | impuestos
        public double price { get; set; }          //precio compra
        public double salePrice { get; set; }      //precio venta
        //public int sugPrice { get; set; }     //precio sugerido, se usa?
        public double discountPrice { get; set; }  //precio con descuento
        public double tax { get; set; }            // aka IVA
        // stock
        public string stockStatus { get; set; }
        public int maxSales { get; set; }
        public int minOrder { get; set; }
        public int minOrderDiscount { get; set; }
        public int orderReminder { get; set; } // pedido "recordatorio"
        public int packageUnits { get; set; }
        // params
        public bool isCool { get; set; }
        public bool isNew { get; set; }
        public bool isTraceable { get; set; }
        public bool isImage { get; set; }
        public bool isPriceWithTaxes { get; set; } // aka IVA

        public SearchResult()
        {

        }

        public SearchResult(OldSearchResult inSearch)
        {
            kunnr = Int32.Parse(inSearch.kunnr);
            matnr = Int32.Parse(inSearch.matnr);
            matkl = inSearch.matkl;
            codebar = inSearch.codigoBarra.Trim();
            productName = inSearch.descripcion.Trim();
            labName = inSearch.laboratorioNombre.Trim();
            labID = Int32.Parse(inSearch.laboratorioID);
            price = inSearch.precio;
            salePrice = inSearch.precioVta;
            discountPrice = inSearch.precio_ConDesc;
            tax = Int32.Parse(inSearch.iva);
            stockStatus = inSearch.estadoStock.Trim();
            maxSales = inSearch.ventaMaxima;
            minOrder = inSearch.compraMinima_UNID;
            minOrderDiscount = inSearch.compraMinima_Oferta;
            orderReminder = inSearch.pedRecordatorio;
            packageUnits = Int32.Parse(inSearch.paq.Trim());
            isCool = (inSearch.mfrgR_REFRIGERADO != null);
            isNew = (inSearch.producto_NUEVO != null);
            isTraceable = (inSearch.trazable != null);
            isImage = inSearch.tieneImagen;
            isPriceWithTaxes = (inSearch.precio_Incluye_IVA > 0);
        }
    }
}