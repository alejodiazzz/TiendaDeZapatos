# Script para agregar nuevos productos a VEYLO Sneaker Store
# Uso: .\add-product.ps1

param(
    [Parameter(Mandatory=$true)]
    [string]$Nombre,

    [Parameter(Mandatory=$true)]
    [int]$Precio,

    [Parameter(Mandatory=$true)]
    [string]$Categoria,

    [Parameter(Mandatory=$true)]
    [string]$Imagen,

    [string]$Codigo = "",
    [string]$Estilo = "",
    [string]$Colores = "",
    [switch]$Destacado = $false
)

# Validar categoría
$categoriasValidas = @("hombre", "mujer", "niños", "deportivo", "casual", "formal")
if ($categoriasValidas -notcontains $Categoria.ToLower()) {
    Write-Host "❌ Categoría inválida. Categorías válidas: $($categoriasValidas -join ', ')" -ForegroundColor Red
    exit 1
}

# Generar ID único
$id = $Nombre.ToLower().Replace(" ", "-").Replace(" ", "") + "-" + (Get-Random -Maximum 9999)

# Mover imagen a carpeta shoes si no está ahí
$imagenOrigen = $Imagen
$imagenDestino = "public\shoes\$Imagen"

if (-not (Test-Path $imagenDestino)) {
    if (Test-Path $imagenOrigen) {
        Copy-Item $imagenOrigen $imagenDestino
        Write-Host "✅ Imagen movida a $imagenDestino" -ForegroundColor Green
    } else {
        Write-Host "❌ No se encontró la imagen: $imagenOrigen" -ForegroundColor Red
        exit 1
    }
}

# Generar código del producto
if ([string]::IsNullOrEmpty($Codigo)) {
    $Codigo = ($id -split '-')[0].Substring(0, 3).ToUpper() + (Get-Random -Maximum 999)
}

# Generar el objeto del producto
$producto = @"
  {
    id: "$id",
    name: "$Nombre",
    price: $Precio,
    category: "$($Categoria.ToLower())",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    image: "/shoes/$Imagen",
    featured: $(if ($Destacado) { "true" } else { "false" }),
    code: "$Codigo",
    style: "$Estilo",
    colors: [$Colores],
  },
"@

Write-Host "`n📦 Producto generado:" -ForegroundColor Cyan
Write-Host $producto -ForegroundColor Yellow

Write-Host "`n📝 Instrucciones:" -ForegroundColor Cyan
Write-Host "1. Copia el código de arriba" -ForegroundColor White
Write-Host "2. Pégalo en data\products.ts dentro del array de products" -ForegroundColor White
Write-Host "3. Guarda el archivo" -ForegroundColor White
Write-Host "4. Ejecuta 'npm run dev' para ver los cambios" -ForegroundColor White

# Preguntar si quiere copiar al portapapeles
$respuesta = Read-Host "`n¿Quieres copiar el código al portapapeles? (S/N)"
if ($respuesta -eq "S" -or $respuesta -eq "s") {
    Set-Clipboard -Value $producto
    Write-Host "✅ Código copiado al portapapeles" -ForegroundColor Green
}
