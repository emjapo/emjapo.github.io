import 'package:flutter/material.dart';
import 'home.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
          primaryColor: Color(0xFFF3ECE5),
          textTheme: TextTheme(
            headline1: TextStyle(
                color: Colors.black,
                fontSize: 64.0,
                fontWeight: FontWeight.w700,
                fontFamily: 'Trap'),
            // headline2: TextStyle(),
            // headline3: TextStyle(),
            // bodyText1: TextStyle(),
            // bodyText2: TextStyle()
          )),
      home: Home(),
    );
  }
}


// #147587, #FA7E5C, #F3ECE5, #FECB5F, #63CCC8