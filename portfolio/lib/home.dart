import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: AlignmentDirectional.topStart,
      fit: StackFit.expand,
      children: <Widget>[
        Container(
          child: Image.asset('assets/images/Oreti.png'),
        ),
        Container(
          child: Text(
            'Emily Port',
            style: Theme.of(context).textTheme.headline1,
          ),
        ),
      ],
    );
  }
}

// child: Text(
//         'Emily Port',
//         style: Theme.of(context).textTheme.headline1,
//       ),
//       color: Theme.of(context).primaryColor,