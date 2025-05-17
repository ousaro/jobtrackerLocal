# Step 1: Use a Maven image to build the application
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the pom.xml file and download dependencies (for caching)
COPY pom.xml .

RUN mvn dependency:go-offline

# Step 4: Copy the source code
COPY . .

# Step 5: Build the application
RUN mvn clean package -DskipTests

# Step 6: Create a lightweight runtime image
FROM eclipse-temurin:17-jre-alpine

# Step 7: Copy the JAR from the previous build stage
COPY --from=build /app/target/*.jar app.jar

# Step 8: Expose the port
EXPOSE 8080

# Step 9: Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
