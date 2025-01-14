package main

import (
	"fmt"
	"net/http"
	"restaurant/handlers"

	"github.com/rs/cors"

	_ "github.com/go-sql-driver/mysql"
)

func main() {

	http.HandleFunc("/customers", handlers.GetCustomers)
	http.HandleFunc("/add-customer", handlers.AddCustomer)
	http.HandleFunc("/delete-customer", handlers.DeleteCustomer)

	// Start the server
	port := ":8080"
	fmt.Printf("Server running at http://localhost%s/\n", port)
	corsOptions := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, // Allow your frontend origin
		AllowedMethods: []string{"GET", "POST", "DELETE"},
		AllowedHeaders: []string{"Content-Type"},
	})
	handler := corsOptions.Handler(http.DefaultServeMux)
	http.ListenAndServe(port, handler)
}
