angular.module("rer.game.models.enemy", []).factory("Enemy", [function() {
    return {
        "metadata": {
            "version": 4.3,
            "type": "Object",
            "generator": "ObjectExporter"
        },
        "geometries": [
            {
                "uuid": "FF82B9CB-26A1-4F00-A17B-9B78FE3CB235",
                "type": "CylinderGeometry",
                "radiusTop": 5.25,
                "radiusBottom": 5.25,
                "height": 5,
                "radialSegments": 32,
                "heightSegments": 1,
                "openEnded": false
            },
            {
                "uuid": "603286E1-ECE5-4220-92C0-84B3FBD37E4E",
                "type": "CylinderGeometry",
                "radiusTop": 5,
                "radiusBottom": 5,
                "height": 5.5,
                "radialSegments": 32,
                "heightSegments": 1,
                "openEnded": false
            },
            {
                "uuid": "522C1ADA-B1FF-41FE-849B-C60A74F84FB6",
                "type": "CylinderGeometry",
                "radiusTop": 4,
                "radiusBottom": 4,
                "height": 6,
                "radialSegments": 32,
                "heightSegments": 1,
                "openEnded": false
            },
            {
                "uuid": "DFBD8EFD-23DB-4EB6-AE1A-DA17EDEB9682",
                "type": "CylinderGeometry",
                "radiusTop": 5,
                "radiusBottom": 5,
                "height": 5.5,
                "radialSegments": 32,
                "heightSegments": 1,
                "openEnded": false
            },
            {
                "uuid": "7BE4F1AB-BA14-4F5E-B167-ABE77F1AA8E6",
                "type": "CylinderGeometry",
                "radiusTop": 4,
                "radiusBottom": 4,
                "height": 6,
                "radialSegments": 32,
                "heightSegments": 1,
                "openEnded": false
            },
            {
                "uuid": "6CF5E5AF-4FD6-4A73-9C95-11570B3CB2D9",
                "type": "BoxGeometry",
                "width": 20,
                "height": 10.5,
                "depth": 5,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            },
            {
                "uuid": "950C7E43-CE83-40AA-AD3C-75B3DDC99688",
                "type": "SphereGeometry",
                "radius": 2,
                "widthSegments": 32,
                "heightSegments": 16,
                "phiStart": 0,
                "phiLength": 6.28,
                "thetaStart": 0,
                "thetaLength": 3.14
            }],
        "materials": [
            {
                "uuid": "79A0A450-2E19-4F0F-B500-A0F6F4B7471B",
                "type": "MeshPhongMaterial",
                "color": 0,
                "emissive": 0,
                "specular": 1118481,
                "shininess": 30,
                "side": 2
            },
            {
                "uuid": "8B9EE1B8-140F-4AA6-BAC7-D60A3859C017",
                "type": "MeshPhongMaterial",
                "color": 16776960,
                "emissive": 0,
                "specular": 1118481,
                "shininess": 30,
                "side": 2
            },
            {
                "uuid": "F7A92048-FABA-40D3-B998-6ED12573F4C5",
                "type": "MeshPhongMaterial",
                "color": 0,
                "emissive": 0,
                "specular": 1118481,
                "shininess": 30,
                "side": 2
            },
            {
                "uuid": "4C0678FB-A0DA-43FA-8B3B-B7E085A3AD99",
                "type": "MeshPhongMaterial",
                "color": 0,
                "emissive": 0,
                "specular": 1118481,
                "shininess": 30,
                "side": 2
            },
            {
                "uuid": "4FB03A4B-FCB2-41FE-9398-3C53E57D48E1",
                "type": "MeshPhongMaterial",
                "color": 16776960,
                "emissive": 0,
                "specular": 1118481,
                "shininess": 30,
                "side": 2
            },
            {
                "uuid": "F3285D2C-0C9E-4CF6-98B7-8A5409BE0ADF",
                "type": "MeshPhongMaterial",
                "color": 0,
                "emissive": 0,
                "specular": 1118481,
                "shininess": 30,
                "side": 2
            },
            {
                "uuid": "7081759E-50FB-40D9-B1AE-79D041B78236",
                "type": "MeshPhongMaterial",
                "color": 0,
                "emissive": 0,
                "specular": 1118481,
                "shininess": 30,
                "side": 2
            },
            {
                "uuid": "894FD47F-AA83-4103-AAF6-A005CE2E6F64",
                "type": "MeshPhongMaterial",
                "color": 16776960,
                "emissive": 0,
                "specular": 1118481,
                "shininess": 30,
                "side": 2
            }],
        "object": {
            "uuid": "E0C497AD-BCA3-4A22-814E-22A694C0BE7E",
            "type": "Group",
            "name": "Bike",
            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,5.25,0,1],
            "children": [
                {
                    "uuid": "44202E1E-A1FC-4989-975E-683711C81269",
                    "type": "Group",
                    "name": "WheelGroup",
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-10,0,0,1],
                    "children": [
                        {
                            "uuid": "F0E8D911-7812-4ACA-AB9B-89F7CF467AC4",
                            "type": "Mesh",
                            "name": "wheel",
                            "geometry": "FF82B9CB-26A1-4F00-A17B-9B78FE3CB235",
                            "material": "79A0A450-2E19-4F0F-B500-A0F6F4B7471B",
                            "matrix": [1,0,0,0,0,0.000796250649727881,0.9999997019767761,0,0,-0.9999997019767761,0.000796250649727881,0,0,0,0,1],
                            "children": [
                                {
                                    "uuid": "59E5FF82-D7D8-42A7-BF32-8F0D268B088C",
                                    "type": "Mesh",
                                    "name": "wheelDetail",
                                    "geometry": "603286E1-ECE5-4220-92C0-84B3FBD37E4E",
                                    "material": "8B9EE1B8-140F-4AA6-BAC7-D60A3859C017",
                                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
                                    "children": [
                                        {
                                            "uuid": "7898A553-3467-4BD2-BB31-85037B629AD6",
                                            "type": "Mesh",
                                            "name": "innerWheelDetail",
                                            "geometry": "522C1ADA-B1FF-41FE-849B-C60A74F84FB6",
                                            "material": "F7A92048-FABA-40D3-B998-6ED12573F4C5",
                                            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
                                        }]
                                }]
                        }]
                },
                {
                    "uuid": "E4EBBC16-B4EE-4C9F-8B2D-9416A577819C",
                    "type": "Object3D",
                    "name": "WheelGroup",
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,10,0,0,1],
                    "children": [
                        {
                            "uuid": "1E7CAC0D-E4C1-4860-8BD5-58B0F99F1827",
                            "type": "Mesh",
                            "name": "wheel",
                            "geometry": "FF82B9CB-26A1-4F00-A17B-9B78FE3CB235",
                            "material": "4C0678FB-A0DA-43FA-8B3B-B7E085A3AD99",
                            "matrix": [1,0,0,0,0,0.000796250649727881,0.9999997019767761,0,0,-0.9999997019767761,0.000796250649727881,0,0,0,0,1],
                            "children": [
                                {
                                    "uuid": "453AE43D-F646-48E4-9791-99B91F002DC0",
                                    "type": "Mesh",
                                    "name": "wheelDetail",
                                    "geometry": "DFBD8EFD-23DB-4EB6-AE1A-DA17EDEB9682",
                                    "material": "4FB03A4B-FCB2-41FE-9398-3C53E57D48E1",
                                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
                                    "children": [
                                        {
                                            "uuid": "A0072EE0-6E13-4500-A39A-DA750E16EED2",
                                            "type": "Mesh",
                                            "name": "innerWheelDetail",
                                            "geometry": "7BE4F1AB-BA14-4F5E-B167-ABE77F1AA8E6",
                                            "material": "F3285D2C-0C9E-4CF6-98B7-8A5409BE0ADF",
                                            "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
                                        }]
                                }]
                        }]
                },
                {
                    "uuid": "43390DC1-0E9E-4441-A7F5-A58DA4F64136",
                    "type": "Mesh",
                    "name": "body",
                    "geometry": "6CF5E5AF-4FD6-4A73-9C95-11570B3CB2D9",
                    "material": "7081759E-50FB-40D9-B1AE-79D041B78236",
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
                },
                {
                    "uuid": "1E5FC4FC-1B6C-481A-8C12-0BE9D69BD2D7",
                    "type": "Mesh",
                    "name": "deck",
                    "geometry": "950C7E43-CE83-40AA-AD3C-75B3DDC99688",
                    "material": "894FD47F-AA83-4103-AAF6-A005CE2E6F64",
                    "matrix": [1,0,0,0,0,1,0,0,0,0,1,0,11.37111759185791,4.6947479248046875,0,1]
                }]
        }
    };
}]);