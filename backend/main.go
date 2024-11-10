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

	// Start the server
	port := ":8080"
	fmt.Printf("Server running at http://localhost%s/\n", port)
	handler := cors.Default().Handler(http.DefaultServeMux)
	http.ListenAndServe(port, handler)
}
