


# Adaptive Catalog JSON Punchout Example App
Updated 3/8/2023

[Adaptive Catalog](https://adaptivecatalog.com) now supports an exciting extensibility feature we're calling JSON Punchout!\
\
This empowers you to create a seamless integration between Adaptive Catalog and your own applications to expand your application's capabilities with our versatile product search functionality.\
The application included in this example includes a Web Client in React (Web folder), and a back-end service using C# Minimal APIs (Service folder).\
We hope to demonstrate a possible ideal implementation, but so long as you follow the pattern, you can use whatever tech stack you are comfortable with.\
\
A user starts from the demo app, clicks the Punchout button, and is directed to Adaptive Catalog.\
Your app will make a request to Adaptive Catalog to generate a Session using your company name, an Adaptive Catalog API key, and a URL to POST the Workspace payload to.\
Once in Adaptive Catalog, a user has the opportunity to search and add products to a session Workspace.\ 
When the user is done searching and adding products to the workspace, the user clicks "Submit" from the Workspace page.\
Adaptive Catalog then sends a payload to your application and expects a URL back that it will then redirect to.\
Your application will need to store that payload, and be able to retrieve it from the URL Adaptive Catalog now redirects the user to.\

## Setup
### Service
	For the Service, you will need to update values in the appsettings.json and appsettings.Development.json file under the PunchoutConfigs section.
 ex: 
 ```
 "PunchoutConfigs": {
    "ServiceBaseUrl": "https://localhost:7201",
    "WebBaseUrl": "http://localhost:3000",
    "Organization": "mycompany",
    "ApiKey": "myAPIkey",
    "AdaptiveCatalogBaseUrl": "https://api.adaptivecatalog.com",
    "Username": "myuser@mycompany.com"
  }
  ```
### Web Client
	For the Web Client, you will need to update the REACT_APP_URL value in the .env and .env.development files to point to the URL for the Service.\
	This should match the config for ServiceBaseUrl from the Service config.
	
## Application Flow
```
	User ->> 3rd Party App: Request Punchout
	3rd Party App ->> AC API: Initiate Request
	AC API ->> ES: Authenticate with API Key
	AC API ->> 3rd Party App: Send Session Key
	3rd Party App ->> User: Redirect to Adaptive Catalog in new tab / window
	User ->> AC Web: Find Products, Generate Workspace, submit
	AC Web ->> AC API: Submit Punchout
	AC API ->> 3rd Party App: Callback URL
	3rd Party App ->> AC API: Success
	AC API ->> AC Web: Success
	AC Web ->> User: Close Tab / Window
```


