# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY NguyenDuongNhutKhang_APIGAME/NguyenDuongNhutKhang_APIGAME.csproj NguyenDuongNhutKhang_APIGAME/
RUN dotnet restore NguyenDuongNhutKhang_APIGAME/NguyenDuongNhutKhang_APIGAME.csproj
COPY NguyenDuongNhutKhang_APIGAME/ NguyenDuongNhutKhang_APIGAME/
RUN dotnet publish NguyenDuongNhutKhang_APIGAME/NguyenDuongNhutKhang_APIGAME.csproj \
    -c Release --no-restore -o /out /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Production \
    PORT=8080 \
    DOTNET_EnableDiagnostics=0
EXPOSE 8080
COPY --from=build /out .
USER $APP_UID
ENTRYPOINT ["dotnet", "NguyenDuongNhutKhang_APIGAME.dll"]
