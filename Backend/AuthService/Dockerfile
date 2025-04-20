# Step 1: Use a Maven image to build the application
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the pom.xml file and download dependencies (for caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Step 4: Copy the source code
COPY src /app/src

# Step 5: Build the application
RUN mvn clean package -DskipTests

# Step 6: Create a lightweight runtime image
FROM openjdk:17-jdk-slim

# Step 7: Copy the JAR from the previous build stage
COPY --from=build /app/target/auth-service-0.0.1-SNAPSHOT.jar app.jar

# Step 8: Expose the port
EXPOSE 8080

# Step 9: Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
