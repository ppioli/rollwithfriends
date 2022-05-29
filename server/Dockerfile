FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Api/src/Supervisor/Api.csproj", "Api/"]
RUN dotnet restore "Api/Api.csproj"
COPY . .
WORKDIR "/src/Api"
RUN dotnet build "Api.csproj" -o /app/build

FROM build AS run
WORKDIR /app
COPY --from=build /app/build .

ENTRYPOINT ["dotnet", "Api.dll"]
# FROM build AS publish
# RUN dotnet publish "Api.csproj" -c Release -o /app/publish

# FROM publish AS init

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .

# ENTRYPOINT ["dotnet", "Api.dll"]
