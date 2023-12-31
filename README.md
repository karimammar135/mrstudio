# MRtravel 
My cs50w final project :slightly_smiling_face:	

![homescreen](https://github.com/karimammar135/mrtravel/assets/78235290/8ab99ebf-768c-48a5-9865-0166eeb3e6d4)

# Installation
This website is built with python3 version 3.8.10
<details>
  <summary>Linux</summary>
  
  1. Clone repository
  ```
  git clone https://github.com/karimammar135/mrtravel.git
  ```
  2. cd to the project main directory
  ```
  cd mrtravel
  ```
  3. Create a virtual environment
  ```
  pyenv virtualenv system venv
  ```
  4. Activate the virtual environment
  ```
  pyenv activate venv
  ```
  5. Install dependencies
  ```
  pip3 install -r requirements.txt
  ```
</details>
<details>
  <summary>Windows/MAC</summary>
  Could not test it on windows and MAC but it should be smilar.
</details>

# Run the app
<details>
  <summary>Run app</summary>

  1. Apply migrations
  ```
  python3 manage.py migrate
  ```
  2. Run the app using this command:
  ```
  python3 manage.py runserver
  ```

</details>

# Distinctiveness and Complexity
My final project is distinct from the previous projects in this course (that depended only on Django for handling both the back-end and front-end (Django templates) sides with the help of some JavaScript libraries) because my project is built with a more complex structure due to the combination between Django back-end and ReactJS complete framework on the front-end, which made my project much more complex than the previous projects. These two powerful frameworks connect using API routes that are responsible for sending and getting data between the back-end and the front-end sides.
<br>
#### Back-end
The back-end is completely handled by Django which consists of many views each responsible for a specific functionality that is mostly called by a fetch call from Reactjs on the front-end. It also consists of 4 models that are related to each other, so my project is 100% based on relational database.
<br>
#### Front-end
The front-end is completely handled by Reactjs that is composed of many components that communicate with the back-end by sending fetch calls either to get or send data. It also gave my project the capability to be a single page application which made my project even more powerful.
#### Integration between front-end and back-end
I used Webpack and Webpack-Loaders to achive this integration. Webpack which is a JavaScript written Static module bundler traces all the imports and checks if a certain import file is of a particular file extension. If yes, it creates a new bundle including all of the imports at one location, then in order to convert these files into JavaScript, I used Webpack-Loaders to transform files from a different language (like TypeScript and CSS) to JavaScript. And finally I placed this single file generated using Webpack and Webpack loaders in my static files directory so that Django will be able to access these files.
I learned many stuff while building my website using this integration such as (Webpack and Webpack-Loaders, in ReactJs I learned more about asynchronous functions, React hooks ...., I also learned to apply scrollbars and other complex layouts , in addition to building sophisticated [graphical designs on figma](https://www.figma.com/community/file/1322846977958676545) before applying them in ReactJs and many more.....)
<br>
#### Description about my website
My website MRtravel is a resortrenting application that is built up with (Django ReactJS as mentioned above) and a convoluted system that
has two types of users, an **Hotelier Account** that can login and add his own hotel by adding hotel's details (hotel name, location, youtube descriptive video ....) in addition to providing the room sizes available in his hotel. And a **Customer Account** that can view and interact with these different hotels and/or rent any room.
<img src="https://github.com/karimammar135/mrtravel/assets/78235290/f042b7dd-e29c-491b-bbe4-6e2648d46822" width="70%"></img>
<img src="https://github.com/karimammar135/mrtravel/assets/78235290/577a52fb-b6d9-4aa2-bfe1-5ac03e376396" width="80%"></img>

To make my website even more complex I gave the hotelier account the ability to edit any detail in his/her hotel whenever he/she wants to, in addition to the ability to add, remove or edit any room in his/her hotel. I also added different charts that show pending surveys of customers that have rented rooms in the hotel showing all details including the ability to remove any rent that has an expired date. In addition to the different types of charts that condense large amounts of data into an easy to understand format (Pie chart for showing Amount of rooms according to thire sizes, Line graph that shows Average prices($) as room sizes increase). The customer account also has an account page to view all required data for his/her rents including the ability to complete any payment that is set to (pay after a survey date) if a user changes his mind and wants to pay directly online.
My website also contains sections for showing **Available Airlines**, **Testing Dash**, **Displaying available hotels in an animated section, scrollbars, serachbars ...** Those are just few features of my website that you can discover while checking my web application!

# File structure (what's contained in each file)
```bash
└── mrtravel ---> Main project's directory (core application)
    ├── README.md ---> Readme file for intructions
    ├── db.sqlite3 ---> Database
    ├── manage.py
    ├── mrtravel ---> Django app
    │   ├── __init__.py
    │   ├── __pycache__
    │   │   ├── __init__.cpython-38.pyc
    │   │   ├── ........
    │   ├── admin.py
    │   ├── apps.py
    │   ├── babel.config.json ---> File that adds few instructions such as required presets and plugins for babel-loader to use
                                    and helps in transpiling jsx into classic JavaScript.
    │   ├── migrations ---> Directory containing all migrations of the project
    │   │   ├── 0001_initial.py
    │   │   ├── .......
    │   │   ├── __init__.py
    │   │   └── __pycache__
    │   │       ├── 0001_initial.cpython-38.pyc
    │   │       ├── .........
    │   ├── models.py ---> File containing all models of my website (User, HotelInfo, RoomSize, Rent)
    │   ├── package.json ---> contains human-readable metadata about the project (like the project name and description) as well as functional metadata like the package version number and a list of dependencies required by the application
    │   ├── src ---> Folder structure completely for React and Webpack
    │   │   ├── components ---> Directory containing all ReactJS componenets
    │   │   │   ├── AccountPage.js ---> React component file
    │   │   │   ├── Airlines.css ---> css Stylesheet file
    │   │   │   ├── Airlines.css.map ---> JSON format file that links css file to its source file
    │   │   │   ├── Airlines.scss ---> scss stylesheet file
    │   │   │   ├── App.js ---> Main app component that controls other components in my website's frontend
    │   │   │   ├── .......
    │   │   │   ├── images ---> Directory containing images
    │   │   │   │   ├── 1-hotel.jpg ---> image file
    │   │   │   │   ├── .........
    │   │   └── index.js ---> This file is the entry point for Webpack to start creating the dependency graph
    │   ├── static ---> Folder for static files that can be accessed by django
    │   │   ├── css
    │   │   │   └── style.css ---> css stylesheet
    │   │   ├── frontend
    │   │   │   ├── 038157aaf589554096e1a5e1731ea713.png --> image file
    │   │   │   ├── ......
    │   │   │   ├── main.js ---> javascript bundle that is accessed by django in the index template
    │   │   │   ├── main.js.LICENSE.txt
    │   │   │   └── videos
    │   │   │       └── video.mp4 ---> video file
    │   │   └── images
    │   │       └── logo.png ---> website's logo
    │   ├── templates
    │   │   └── mrtravel
    │   │       └── index.html ---> Main html django template that displays the app's frontend (displays main.js bundle)
    │   ├── tests.py
    │   ├── urls.py ---> My website urls (including urls for API routes)
    │   ├── views.py ---> file including views and API routes
    │   ├── webpack.config.js ---> configuration for webpack and webpack loaders
    │   └── yarn.lock ---> file that stores the versions of which dependencies are installed with the package
    ├── package.json ---> contains human-readable metadata about the project (like the project name and description) as well as functional metadata like the package version number and a list of dependencies required by the application
    ├── requirements.txt ---> file containing project's dependencies
    ├── resortrenting
    │   ├── __init__.py
    │   ├── __pycache__
    │   │   ├── __init__.cpython-38.pyc
    │   │   ├── settings.cpython-38.pyc
    │   │   ├── urls.cpython-38.pyc
    │   │   └── wsgi.cpython-38.pyc
    │   ├── asgi.py ---> asgi interface configuration
    │   ├── settings.py
    │   ├── urls.py ---> global urls mapping
    │   └── wsgi.py
    └── yarn.lock ---> file that stores the versions of which dependencies are installed with the package
