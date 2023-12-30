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

  <summary>Windows/MAC:</summary>
  Could not test it on windows or MAC but it should be similar as linux.
  
</details>

# Run the app
<details>
  <summary>Linux</summary>

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
The front-end is completely handled by Reactjs that is composed of many components that communicate with the back-end by sending fetch calls either to get or send data. It also gave my project the capability to be a single page application which made my project even more powerful than previous projects in this course.
#### Integration between front-end and back-end
I used Webpack and Webpack-Loaders to achive this integration. Webpack which is a JavaScript written Static module bundler traces all the imports and checks if a certain import file is of a particular file extension. If yes, it creates a new bundle including all of the imports at one location, then in order to convert these files into JavaScript, I used Webpack-Loaders to transform files from a different language (like TypeScript and CSS) to JavaScript. And finally I placed this single file generated using Webpack and Webpack loaders in my static files directory so that Django will be able to access these files.
I learned many stuff while building my website using this integration such as (Webpack and Webpack-Loaders, in ReactJs I learned more about asynchronous functions, React hooks ...., I also learned to apply scrollbars and other complex layouts , in addition to building sophisticated [graphical designs on figma](https://www.figma.com/community/file/1322846977958676545) before applying them in ReactJs and many more.....)
<br>
#### Description about my website
My website MRtravel is a resortrenting application that is built up with (Django ReactJS as mentioned above) and a convoluted system that
has two types of users, an **Hotelier Account** that can login and add his own hotel by adding hotel's details (hotel name, location, youtube descriptive video ....) in addition to providing the room sizes available in his hotel. And a **Customer Account** that can view and interact with these different hotels and/or rent any room.
![Screenshot (21)](https://github.com/karimammar135/mrtravel/assets/78235290/f5682610-ca7d-4f22-b2f5-29b493cfd08a)

To make my website even more complex I gave the hotelier account the ability to edit any detail in his hotel whenever he/she wants to, in addition to the ability to add, remove or edit any room in his/her hotel. I also added different charts that show pending surveys of customers that have rented rooms in the hotel showing all details including the ability to remove any rent that has an expired date. In addition to the different types of charts that condense large amounts of data into an easy to understand format (Pie chart for showing Amount of rooms according to thire sizes, Line graph that shows Average prices($) as room sizes increase). The customer account also has an account page to view all required data for his/her rents including the ability to complete any payment that is set to (pay after a survey date) if a user changes his mind and wants to pay directly online.
My website also contains sections for showing **Available Airlines**, **Testing Dash**, **Displaying available hotels in an animated section, scrollbars, serachbars ...** Those are just few features of my website that you can discover while checking my web application!

# File structure (what's contained in each file)
```bash
└── mrtravel ---> Main project directory (core application )
    ├── README.md ---> Readme file for intructions
    ├── db.sqlite3
    ├── manage.py
    ├── mrtravel
    │   ├── __init__.py
    │   ├── __pycache__
    │   │   ├── __init__.cpython-38.pyc
    │   │   ├── admin.cpython-38.pyc
    │   │   ├── apps.cpython-38.pyc
    │   │   ├── models.cpython-38.pyc
    │   │   ├── urls.cpython-38.pyc
    │   │   └── views.cpython-38.pyc
    │   ├── admin.py
    │   ├── apps.py
    │   ├── babel.config.json
    │   ├── migrations
    │   │   ├── 0001_initial.py
    │   │   ├── 0002_alter_roomsize_discount.py
    │   │   ├── 0003_rename_mrtravel_hyphen_hotelinfo_mrtravel_hyphin.py
    │   │   ├── 0004_alter_hotelinfo_location.py
    │   │   ├── 0005_hotelinfo_feature1_hotelinfo_feature2_and_more.py
    │   │   ├── 0006_alter_hotelinfo_feature1_alter_hotelinfo_feature2_and_more.py
    │   │   ├── 0007_alter_roomsize_discount.py
    │   │   ├── 0008_hotelinfo_direct_payment_discount_and_more.py
    │   │   ├── 0009_roomsize_amount_rent.py
    │   │   ├── 0010_remove_rent_date_rent_survey_date.py
    │   │   ├── 0011_alter_rent_room_size.py
    │   │   ├── 0012_roomsize_available_rooms.py
    │   │   ├── 0013_hotelinfo_owner.py
    │   │   ├── 0014_rent_survey_end_date.py
    │   │   ├── 0015_rent_total_price.py
    │   │   ├── 0016_rent_hotel_alter_rent_customer.py
    │   │   ├── 0017_rent_payment.py
    │   │   ├── 0018_rent_duration.py
    │   │   ├── 0019_rent_expired.py
    │   │   ├── __init__.py
    │   │   └── __pycache__
    │   │       ├── 0001_initial.cpython-38.pyc
    │   │       ├── 0002_alter_roomsize_discount.cpython-38.pyc
    │   │       ├── 0003_rename_mrtravel_hyphen_hotelinfo_mrtravel_hyphin.cpython-38.pyc
    │   │       ├── 0004_alter_hotelinfo_location.cpython-38.pyc
    │   │       ├── 0005_hotelinfo_feature1_hotelinfo_feature2_and_more.cpython-38.pyc
    │   │       ├── 0006_alter_hotelinfo_feature1_alter_hotelinfo_feature2_and_more.cpython-38.pyc
    │   │       ├── 0007_alter_roomsize_discount.cpython-38.pyc
    │   │       ├── 0008_hotelinfo_direct_payment_discount_and_more.cpython-38.pyc
    │   │       ├── 0009_roomsize_amount_rent.cpython-38.pyc
    │   │       ├── 0010_remove_rent_date_rent_survey_date.cpython-38.pyc
    │   │       ├── 0011_alter_rent_room_size.cpython-38.pyc
    │   │       ├── 0012_roomsize_available_rooms.cpython-38.pyc
    │   │       ├── 0013_hotelinfo_owner.cpython-38.pyc
    │   │       ├── 0014_rent_survey_end_date.cpython-38.pyc
    │   │       ├── 0015_rent_total_price.cpython-38.pyc
    │   │       ├── 0016_rent_hotel_alter_rent_customer.cpython-38.pyc
    │   │       ├── 0017_rent_payment.cpython-38.pyc
    │   │       ├── 0018_rent_duration.cpython-38.pyc
    │   │       ├── 0019_rent_expired.cpython-38.pyc
    │   │       └── __init__.cpython-38.pyc
    │   ├── models.py
    │   ├── package.json
    │   ├── src
    │   │   ├── components
    │   │   │   ├── AccountPage.js
    │   │   │   ├── AddHotelPage.js
    │   │   │   ├── Airlines.css
    │   │   │   ├── Airlines.css.map
    │   │   │   ├── Airlines.js
    │   │   │   ├── Airlines.scss
    │   │   │   ├── App.js
    │   │   │   ├── ChartBox.css
    │   │   │   ├── ChartBox.js
    │   │   │   ├── Dash.js
    │   │   │   ├── Footer.js
    │   │   │   ├── HotelDetails.js
    │   │   │   ├── HotelDetailsSection.js
    │   │   │   ├── HotelLocation.js
    │   │   │   ├── HotelierPage.js
    │   │   │   ├── LoginPage.js
    │   │   │   ├── Payment.js
    │   │   │   ├── PaymentDetails.js
    │   │   │   ├── RelaxingPleasure.css
    │   │   │   ├── RelaxingPleasure.css.map
    │   │   │   ├── RelaxingPleasure.js
    │   │   │   ├── RelaxingPleasure.scss
    │   │   │   ├── Resorts.js
    │   │   │   ├── SearchBar.js
    │   │   │   ├── SearchBox.js
    │   │   │   ├── SearchResults.css
    │   │   │   ├── SearchResults.js
    │   │   │   ├── UpdateURL.js
    │   │   │   ├── VideoSection.js
    │   │   │   ├── accountpage.css
    │   │   │   ├── accountpage.css.map
    │   │   │   ├── accountpage.scss
    │   │   │   ├── addhotelpage.css
    │   │   │   ├── addhotelpage.css.map
    │   │   │   ├── addhotelpage.scss
    │   │   │   ├── app.css
    │   │   │   ├── dash.css
    │   │   │   ├── dash.css.map
    │   │   │   ├── dash.scss
    │   │   │   ├── dropcontent.js
    │   │   │   ├── footer.css
    │   │   │   ├── footer.css.map
    │   │   │   ├── footer.scss
    │   │   │   ├── getCookie.js
    │   │   │   ├── hoteldetails.css
    │   │   │   ├── hoteldetails.css.map
    │   │   │   ├── hoteldetails.scss
    │   │   │   ├── hotelierpage.css
    │   │   │   ├── hotelierpage.css.map
    │   │   │   ├── hotelierpage.scss
    │   │   │   ├── images
    │   │   │   │   ├── 1-hotel.jpg
    │   │   │   │   ├── 2-hotel.jpg
    │   │   │   │   ├── 3-hotel.jpg
    │   │   │   │   ├── 4-hotel.jpg
    │   │   │   │   ├── 5-hotel.jpg
    │   │   │   │   ├── ac.png
    │   │   │   │   ├── barcelo.jpg
    │   │   │   │   ├── biman.png
    │   │   │   │   ├── delta.jpg
    │   │   │   │   ├── dinner.png
    │   │   │   │   ├── emirates.png
    │   │   │   │   ├── hitto.jpg
    │   │   │   │   ├── hotel_location.png
    │   │   │   │   ├── lounge.jpg
    │   │   │   │   ├── malaysia.jpg
    │   │   │   │   ├── mircle.jpg
    │   │   │   │   ├── pool-1.jpg
    │   │   │   │   ├── pool-2.jpg
    │   │   │   │   ├── pool.png
    │   │   │   │   ├── profile_icon.png
    │   │   │   │   ├── qatar.png
    │   │   │   │   ├── sackman.jpg
    │   │   │   │   ├── schloss.jpg
    │   │   │   │   ├── smiley-woman-2.png
    │   │   │   │   ├── smiley-woman-original.jpg
    │   │   │   │   ├── smiley-woman.png
    │   │   │   │   ├── thai-lion.jpg
    │   │   │   │   ├── warwick-hotel.jpg
    │   │   │   │   ├── welcoming.jpg
    │   │   │   │   └── wifi.png
    │   │   │   ├── loginpage.css
    │   │   │   ├── loginpage.css.map
    │   │   │   ├── loginpage.scss
    │   │   │   ├── navbar.css
    │   │   │   ├── navbar.css.map
    │   │   │   ├── navbar.js
    │   │   │   ├── navbar.scss
    │   │   │   ├── navbtn.js
    │   │   │   ├── navcontent.js
    │   │   │   ├── payment.css
    │   │   │   ├── payment.css.map
    │   │   │   ├── payment.scss
    │   │   │   ├── resorts.css
    │   │   │   ├── resorts.css.map
    │   │   │   ├── resorts.scss
    │   │   │   ├── video-section.css
    │   │   │   ├── video-section.css.map
    │   │   │   ├── video-section.scss
    │   │   │   ├── video.mp4
    │   │   │   ├── videoplayer.js
    │   │   │   ├── wait.html
    │   │   │   ├── welcomingpage.css
    │   │   │   ├── welcomingpage.css.map
    │   │   │   ├── welcomingpage.js
    │   │   │   └── welcomingpage.scss
    │   │   └── index.js
    │   ├── static
    │   │   ├── css
    │   │   │   ├── App_copy.js
    │   │   │   ├── grid.css
    │   │   │   ├── grid.css.map
    │   │   │   ├── grid.js
    │   │   │   ├── grid.scss
    │   │   │   └── style.css
    │   │   ├── frontend
    │   │   │   ├── 038157aaf589554096e1a5e1731ea713.png
    │   │   │   ├── 1a87a815490c348d35c5.jpg
    │   │   │   ├── 1a87a815490c348d35c55de3ba2ff687.jpg
    │   │   │   ├── 1d38f68803863288c479.jpg
    │   │   │   ├── 1d38f68803863288c4792418eeb81968.jpg
    │   │   │   ├── 2026126468a3e304ad48a468d3b9ca5c.jpg
    │   │   │   ├── 215f4f4bea880ace5ece.jpg
    │   │   │   ├── 215f4f4bea880ace5ece85bb10b08ca5.jpg
    │   │   │   ├── 23abcaaf1b510c257b2c.jpg
    │   │   │   ├── 23abcaaf1b510c257b2c4e295538bb2b.jpg
    │   │   │   ├── 251f744994258742e33c.jpg
    │   │   │   ├── 251f744994258742e33c6c2ecf6791d8.jpg
    │   │   │   ├── 2a1ae2a82211d97a26fb82bde16f4482.jpg
    │   │   │   ├── 2b3ba06de19f0e4cba98b7974c42cc9e.jpg
    │   │   │   ├── 34a1d495224fd07812bbd402d57a9d40.png
    │   │   │   ├── 3e3b008c12b4475fa2c6.jpg
    │   │   │   ├── 3e3b008c12b4475fa2c636fd5b710e4a.jpg
    │   │   │   ├── 413bacd2c613a7e3d6f9.jpg
    │   │   │   ├── 413bacd2c613a7e3d6f92c44ae84cadd.jpg
    │   │   │   ├── 48d7f111cf2b8c70b02838c7ec785ebf.jpg
    │   │   │   ├── 528e4a82247a13c6e176.jpg
    │   │   │   ├── 528e4a82247a13c6e176fac169202f48.jpg
    │   │   │   ├── 573b911415f173f89e73.jpg
    │   │   │   ├── 573b911415f173f89e736cf9319ab7bc.jpg
    │   │   │   ├── 5faf09a7795d28bf5a2b48c31da7cff4.png
    │   │   │   ├── 723caf912a2a26c928126584903b96c9.png
    │   │   │   ├── 757d35686f202fd7adb97423e58974c0.png
    │   │   │   ├── 819a8ca3c62023429d1b.jpg
    │   │   │   ├── 819a8ca3c62023429d1b4b0f5df6f2d0.jpg
    │   │   │   ├── 821dfc430254be4a67a0.jpg
    │   │   │   ├── 821dfc430254be4a67a06de142620651.jpg
    │   │   │   ├── 8436cedee1ad62bf274839b38b686eca.png
    │   │   │   ├── 9504c32c34ee80ae0346.jpg
    │   │   │   ├── 9504c32c34ee80ae0346bc9f52912483.jpg
    │   │   │   ├── 9c161b37a9b14db408b8918ea0e3c4a5.webp
    │   │   │   ├── ae4fa49546c9c10f5624561f745b35db.png
    │   │   │   ├── bf6baeb476b4fadd03ac.jpg
    │   │   │   ├── bf6baeb476b4fadd03acff81d180d1c3.jpg
    │   │   │   ├── c67893a91454a36df358.png
    │   │   │   ├── c67893a91454a36df358fe00d84bda82.png
    │   │   │   ├── d52b5bb0248e61dea914.jpg
    │   │   │   ├── d52b5bb0248e61dea914b3caaaba84dd.jpg
    │   │   │   ├── db60bd8ac67f598c3705.jpg
    │   │   │   ├── db60bd8ac67f598c3705694dd6a90661.jpg
    │   │   │   ├── dc6885d0ca6a59dce16ea342e4728d2e.png
    │   │   │   ├── de55ddb3da4088bd76c3311502055fb9.png
    │   │   │   ├── e78118f7fe2b7d534036.jpg
    │   │   │   ├── e78118f7fe2b7d53403665b204737c82.jpg
    │   │   │   ├── ef03eb8a444199604732bf7fd993b957.png
    │   │   │   ├── main.js
    │   │   │   ├── main.js.LICENSE.txt
    │   │   │   └── videos
    │   │   │       └── video.mp4
    │   │   └── images
    │   │       └── logo.png
    │   ├── templates
    │   │   └── mrtravel
    │   │       └── index.html
    │   ├── tests.py
    │   ├── urls.py
    │   ├── views.py
    │   ├── webpack.config.js
    │   └── yarn.lock
    ├── package.json
    ├── requirements.txt
    ├── resortrenting
    │   ├── __init__.py
    │   ├── __pycache__
    │   │   ├── __init__.cpython-38.pyc
    │   │   ├── settings.cpython-38.pyc
    │   │   ├── urls.cpython-38.pyc
    │   │   └── wsgi.cpython-38.pyc
    │   ├── asgi.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    └── yarn.lock

├── README.md ---> Readme file for intructions
├── db.sqlite3 ---> Database
├── manage.py 
├── mrtravel ---> 
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-38.pyc
│   │   ├── admin.cpython-38.pyc
│   │   ├── apps.cpython-38.pyc
│   │   ├── models.cpython-38.pyc
│   │   ├── urls.cpython-38.pyc
│   │   └── views.cpython-38.pyc
│   ├── admin.py
│   ├── apps.py
│   ├── babel.config.json
│   ├── migrations ---> Migrations folder that contains all migrations made
│   │   ├── 0001_initial.py
│   │   ├── ........
│   │   ├── __init__.py
│   │   └── __pycache__
│   │       ├── 0001_initial.cpython-38.pyc
│   │       ├── ......
│   ├── models.py
│   ├── package.json
│   ├── src
│   │   ├── components ---> Diractory that contains all react components
│   │   │   ├── AccountPage.js --- > React component
│   │   │   ├── accountpage.css --- > css style sheet
│   │   │   ├── accountpage.css.map --- > conversts scss to css
│   │   │   ├── accountpage.scss --- > Scss style sheet
│   │   │   ├── ......
│   │   │   ├── images
│   │   │   │   ├── 1-hotel.jpg
│   │   │   │   ├── 2-hotel.jpg
│   │   │   │   ├── ........
│   │   └── index.js
│   ├── static
│   │   ├── css
│   │   │   ├── App_copy.js
│   │   │   ├── grid.css
│   │   │   ├── grid.css.map
│   │   │   ├── grid.js
│   │   │   ├── grid.scss
│   │   │   └── style.css
│   │   ├── frontend
│   │   │   ├── 038157aaf589554096e1a5e1731ea713.png
│   │   │   ├── 1a87a815490c348d35c5.jpg
│   │   │   ├── 1a87a815490c348d35c55de3ba2ff687.jpg
│   │   │   ├── 1d38f68803863288c479.jpg
│   │   │   ├── 1d38f68803863288c4792418eeb81968.jpg
│   │   │   ├── 2026126468a3e304ad48a468d3b9ca5c.jpg
│   │   │   ├── 215f4f4bea880ace5ece.jpg
│   │   │   ├── 215f4f4bea880ace5ece85bb10b08ca5.jpg
│   │   │   ├── 23abcaaf1b510c257b2c.jpg
│   │   │   ├── 23abcaaf1b510c257b2c4e295538bb2b.jpg
│   │   │   ├── 251f744994258742e33c.jpg
│   │   │   ├── 251f744994258742e33c6c2ecf6791d8.jpg
│   │   │   ├── 2a1ae2a82211d97a26fb82bde16f4482.jpg
│   │   │   ├── 2b3ba06de19f0e4cba98b7974c42cc9e.jpg
│   │   │   ├── 34a1d495224fd07812bbd402d57a9d40.png
│   │   │   ├── 3e3b008c12b4475fa2c6.jpg
│   │   │   ├── 3e3b008c12b4475fa2c636fd5b710e4a.jpg
│   │   │   ├── 413bacd2c613a7e3d6f9.jpg
│   │   │   ├── 413bacd2c613a7e3d6f92c44ae84cadd.jpg
│   │   │   ├── 48d7f111cf2b8c70b02838c7ec785ebf.jpg
│   │   │   ├── 528e4a82247a13c6e176.jpg
│   │   │   ├── 528e4a82247a13c6e176fac169202f48.jpg
│   │   │   ├── 573b911415f173f89e73.jpg
│   │   │   ├── 573b911415f173f89e736cf9319ab7bc.jpg
│   │   │   ├── 5faf09a7795d28bf5a2b48c31da7cff4.png
│   │   │   ├── 723caf912a2a26c928126584903b96c9.png
│   │   │   ├── 757d35686f202fd7adb97423e58974c0.png
│   │   │   ├── 819a8ca3c62023429d1b.jpg
│   │   │   ├── 819a8ca3c62023429d1b4b0f5df6f2d0.jpg
│   │   │   ├── 821dfc430254be4a67a0.jpg
│   │   │   ├── 821dfc430254be4a67a06de142620651.jpg
│   │   │   ├── 8436cedee1ad62bf274839b38b686eca.png
│   │   │   ├── 9504c32c34ee80ae0346.jpg
│   │   │   ├── 9504c32c34ee80ae0346bc9f52912483.jpg
│   │   │   ├── 9c161b37a9b14db408b8918ea0e3c4a5.webp
│   │   │   ├── ae4fa49546c9c10f5624561f745b35db.png
│   │   │   ├── bf6baeb476b4fadd03ac.jpg
│   │   │   ├── bf6baeb476b4fadd03acff81d180d1c3.jpg
│   │   │   ├── c67893a91454a36df358.png
│   │   │   ├── c67893a91454a36df358fe00d84bda82.png
│   │   │   ├── d52b5bb0248e61dea914.jpg
│   │   │   ├── d52b5bb0248e61dea914b3caaaba84dd.jpg
│   │   │   ├── db60bd8ac67f598c3705.jpg
│   │   │   ├── db60bd8ac67f598c3705694dd6a90661.jpg
│   │   │   ├── dc6885d0ca6a59dce16ea342e4728d2e.png
│   │   │   ├── de55ddb3da4088bd76c3311502055fb9.png
│   │   │   ├── e78118f7fe2b7d534036.jpg
│   │   │   ├── e78118f7fe2b7d53403665b204737c82.jpg
│   │   │   ├── ef03eb8a444199604732bf7fd993b957.png
│   │   │   ├── main.js
│   │   │   ├── main.js.LICENSE.txt
│   │   │   └── videos
│   │   │       └── video.mp4
│   │   └── images
│   │       └── logo.png
│   ├── templates
│   │   └── mrtravel
│   │       └── index.html
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   ├── webpack.config.js
│   └── yarn.lock
├── package.json
├── requirements.txt
├── resortrenting
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-38.pyc
│   │   ├── settings.cpython-38.pyc
│   │   ├── urls.cpython-38.pyc
│   │   └── wsgi.cpython-38.pyc
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── yarn.lock
```
