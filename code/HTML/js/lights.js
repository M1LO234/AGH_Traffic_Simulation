// 3_1_T
var ligh = [
    { lt:50.0551139, ln: 19.927773, id: "S01_1_T", st: true},
    { lt:50.0552473, ln: 19.9272767, id: "S01_2_T", st: true},
    { lt:50.0592588, ln: 19.9254728, id: "S02_1_T", st: true},
    { lt:50.0593478, ln: 19.9247206, id: "S02_2_T", st: true},
    { lt:50.065578, ln: 19.9248275, id: "S03_1_T", st: true},
    { lt:50.0660539, ln: 19.9242856, id: "S03_2_T", st: true},
    { lt:50.0688798, ln: 19.9266227, id: "S04_1_T", st: true},
    { lt:50.0693515, ln: 19.9263209, id: "S04_2_T", st: true},
    { lt:50.0710673, ln: 19.9291352, id: "S05_1_T", st: true},
    { lt:50.0714667, ln: 19.9287958, id: "S05_2_T", st: true},
    { lt:50.0733552, ln: 19.9344035, id: "S06_1_T", st: true},
    { lt:50.0737209, ln: 19.9342641, id: "S06_2_T", st: true},
    { lt:50.0679206, ln: 19.9521199, id: "S07_1_T", st: true},
    { lt:50.0680127, ln: 19.9526215, id: "S07_2_T", st: true},
    { lt:50.0497009, ln: 19.9645452, id: "S08_1_T", st: true},
    { lt:50.049914, ln: 19.9648771, id: "S08_2_T", st: true},
    { lt:50.0487459, ln: 19.9676329, id: "S09_1_T", st: true},
    { lt:50.0487166, ln: 19.9685207, id: "S09_2_T", st: true},
    { lt:50.0453481, ln: 19.9725143, id: "S10_1_T", st: true},
    { lt:50.0380066, ln: 19.9511601, id: "S11_1_T", st: true},
    { lt:50.0377292, ln: 19.9513452, id: "S11_2_T", st: true},
    { lt:50.0356712, ln: 19.9424703, id: "S12_1_T", st: true},
    { lt:50.0355687, ln: 19.94219, id: "S12_2_T", st: true},
    { lt:50.0403784, ln: 19.9367732, id: "S13_1_T", st: true},
    { lt:50.0405627, ln: 19.9362743, id: "S13_2_T", st: true},
    { lt:50.0554049, ln: 19.9276952, id: "S01_1_R", st: false},
    { lt:50.0594116, ln: 19.9253858, id: "S02_1_R", st: false},
    { lt:50.0592166, ln: 19.9247527, id: "S02_2_R", st: false},
    { lt:50.0658138, ln: 19.9250179, id: "S03_1_R", st: false},
    { lt:50.0656701, ln: 19.9240618, id: "S03_2_R", st: false},
    { lt:50.0712941, ln: 19.9296555, id: "S05_1_R", st: false},
    { lt:50.071241, ln: 19.9282942, id: "S05_2_R", st: false},
    { lt:50.0736745, ln: 19.9339301, id: "S06_2_R", st: false},
    { lt:50.0678031, ln: 19.9523526, id: "S07_1_R", st: false}
]

var nextLigh = ligh

var in_out = [
    {nr:1, dir:1, i:3225, o:3222},
    {nr:1, dir:2, i:'', o:16187},
    {nr:2, dir:1, i:'', o:''},
    {nr:2, dir:2, i:16080, o:16077},
    {nr:3, dir:1, i:3355, o:3352},
    {nr:3, dir:2, i:15995, o:15992},
    {nr:4, dir:1, i:'', o:''},
    {nr:4, dir:2, i:'', o:15918},
    {nr:5, dir:1, i:3509, o:3506},
    {nr:5, dir:2, i:'', o:''}, //15738
    {nr:6, dir:1, i:3570, o:''},
    {nr:6, dir:2, i:'', o:''},
    {nr:7, dir:1, i:3699, o:3696},
    {nr:7, dir:2, i:15676, o:17563},
    {nr:8, dir:1, i:'', o:''},
    {nr:8, dir:2, i:17478, o:''},
    {nr:9, dir:1, i:'', o:''},
    {nr:9, dir:2, i:17437, o:17434},
    {nr:10, dir:1, i:'', o:''},
    {nr:10, dir:2, i:17367, o:''},
    {nr:11, dir:1, i:'', o:''},
    {nr:11, dir:2, i:17284, o:17281},
    {nr:12, dir:1, i:6470, o:6467},
    {nr:12, dir:2, i:'', o:''},
    {nr:13, dir:1, i:'', o:7994},
    {nr:13, dir:2, i:'', o:''},
    {nr:14, dir:1, i:8026, o:8023},
    {nr:14, dir:2, i:'', o:''},
    {nr:15, dir:1, i:2390, o:8138},
    {nr:15, dir:2, i:'', o:''},
    {nr:16, dir:1, i:'', o:11220},
    {nr:16, dir:2, i:'', o:22074},
    {nr:17, dir:1, i:'', o:2721},
    {nr:17, dir:2, i:16773, o:''},
    {nr:18, dir:1, i:'', o:8177},
    {nr:18, dir:2, i:16719, o:16716},
    {nr:19, dir:1, i:8225, o:8222},
    {nr:19, dir:2, i:'', o:''},
    {nr:20, dir:1, i:'', o:8314},
    {nr:20, dir:2, i:'', o:''},
    {nr:21, dir:1, i:'', o:7909},
    {nr:21, dir:2, i:'', o:''},
    {nr:22, dir:1, i:3861, o:11145},
    {nr:42, dir:1, i:16622, o:16667},
    {nr:23, dir:1, i:8317, o:2778},
    {nr:23, dir:2, i:'', o:16619},
    {nr:24, dir:1, i:4576, o:4478},
    {nr:24, dir:2, i:'', o:''},
    {nr:25, dir:1, i:8942, o:8939},
    {nr:25, dir:2, i:'', o:''},
    {nr:26, dir:1, i:'', o:11176},
    {nr:26, dir:2, i:'', o:''},
    {nr:27, dir:1, i:'', o:11245},
    {nr:27, dir:2, i:'', o:16507},
    {nr:28, dir:1, i:'', o:2867},
    {nr:28, dir:2, i:'', o:''},
    {nr:29, dir:1, i:'', o:2916},
    {nr:29, dir:2, i:'', o:''},
    {nr:30, dir:1, i:2919, o:''},
    {nr:30, dir:2, i:16367, o:16364},
    {nr:31, dir:1, i:3057, o:3054}, //3054
    {nr:31, dir:2, i:16236, o:16233},

]


var flow = [
    {n:"Czarnowiejska/Mickiewicza 1", p1:5880, p2:1967, f:0, m:0},
    {n:"Czarnowiejska/Mickiewicza 2", p1:11565, p2:17879, f:0, m:0},
    {n:"Łobuzowska/Mickiewicza 1", p1:6119, p2:2207, f:0, m:0},
    {n:"Łobuzowska/Mickiewicza 2", p1:11332, p2:17649, f:0, m:0},
    {n:"Kościuszki/Krasińskiego 1", p1:5460, p2:1548, f:0, m:0},
    {n:"Kościuszki/Krasińskiego 2", p1:11995, p2:18309, f:0, m:0},
    {n:"Piłsudskiego/Mickiewicza 1", p1:5625, p2:1715, f:0, m:0},
    {n:"Piłsudskiego/Mickiewicza 2", p1:11824, p2:18138, f:0, m:0},
    {n:"Śląska/Słowackiego 1", p1:6270, p2:2357, f:0, m:0},
    {n:"Śląska/Słowackiego 2", p1:15595, p2:21904, f:0, m:0},
    {n:"Rakowicka/Lubomirskiego 1", p1:6794, p2:10045, f:0, m:0},
    {n:"Rakowicka/Lubomirskiego 2", p1:14977, p2:21287, f:0, m:0},
    {n:"Dekerta/Klimeckiego 1", p1:7734, p2:10984, f:0, m:0},
    {n:"Dekerta/Klimeckiego 2", p1:20290, p2:13979, f:0, m:0},
    {n:"Wadowicka/Konopnickiej 2", p1:12774, p2:19090, f:0, m:0}
]
