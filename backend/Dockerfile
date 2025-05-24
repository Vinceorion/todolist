# Étape 1: Utiliser une image de base OpenJDK
FROM openjdk:17-jdk-slim-buster

# Étape 2: Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Étape 3: Copier le fichier JAR de l'application
COPY main-app/target/main-app-0.0.1-SNAPSHOT.jar main-app-0.0.1-SNAPSHOT.jar

# Étape 4: Exposer le port sur lequel l'application écoute (par défaut 8080 pour Spring Boot)
EXPOSE 9090

# Étape 5: Définir la commande pour démarrer l'application
CMD ["java", "-jar", "main-app-0.0.1-SNAPSHOT.jar"]
