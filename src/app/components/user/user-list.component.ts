import { Component, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'
import { IUser  } from '../../models/user.interface'

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit{
    
    public Users:IUser[];
    public rows:Array<any> = [];
    public columns:Array<any> = [
      {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
      {
        title: 'Position',
        name: 'position',
        sort: false,
        filtering: {filterString: '', placeholder: 'Filter by position'}
      },
      {title: 'Office', className: ['office-header', 'text-success'], name: 'office', sort: 'asc'},
      {title: 'Extn.', name: 'ext', sort: '', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
      {title: 'Start date', className: 'text-warning', name: 'startDate'},
      {title: 'Salary ($)', name: 'salary'}
    ];
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 5;
    public numPages:number = 1;
    public length:number = 0;
  
    public config:any = {
      paging: true,
      sorting: {columns: this.columns},
      filtering: {filterString: ''},
      className: ['table-striped', 'table-bordered']
    };
  
    private data:Array<any> = TableData;
  
    public constructor(private userService: UserService) {
      this.length = this.data.length;
    }
  
    public ngOnInit():void {
      this.loadUsers();
      this.onChangeTable(this.config);
    }

    public loadUsers(){
        this.userService.getUsers()
            .subscribe((users: IUser[]) => {
                this.Users = users;
                console.log('Users', this.Users);
            })
    }
  
    public changePage(page:any, data:Array<any> = this.data):Array<any> {
      let start = (page.page - 1) * page.itemsPerPage;
      let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
    }
  
    public changeSort(data:any, config:any):any {
      if (!config.sorting) {
        return data;
      }
  
      let columns = this.config.sorting.columns || [];
      let columnName:string = void 0;
      let sort:string = void 0;
  
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].sort !== '' && columns[i].sort !== false) {
          columnName = columns[i].name;
          sort = columns[i].sort;
        }
      }
  
      if (!columnName) {
        return data;
      }
  
      // simple sorting
      return data.sort((previous:any, current:any) => {
        if (previous[columnName] > current[columnName]) {
          return sort === 'desc' ? -1 : 1;
        } else if (previous[columnName] < current[columnName]) {
          return sort === 'asc' ? -1 : 1;
        }
        return 0;
      });
    }
  
    public changeFilter(data:any, config:any):any {
      let filteredData:Array<any> = data;
      this.columns.forEach((column:any) => {
        if (column.filtering) {
          filteredData = filteredData.filter((item:any) => {
            return item[column.name].match(column.filtering.filterString);
          });
        }
      });
  
      if (!config.filtering) {
        return filteredData;
      }
  
      if (config.filtering.columnName) {
        return filteredData.filter((item:any) =>
          item[config.filtering.columnName].match(this.config.filtering.filterString));
      }
  
      let tempArray:Array<any> = [];
      filteredData.forEach((item:any) => {
        let flag = false;
        this.columns.forEach((column:any) => {
          if (item[column.name].toString().match(this.config.filtering.filterString)) {
            flag = true;
          }
        });
        if (flag) {
          tempArray.push(item);
        }
      });
      filteredData = tempArray;
  
      return filteredData;
    }
  
    public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
      if (config.filtering) {
        Object.assign(this.config.filtering, config.filtering);
      }
  
      if (config.sorting) {
        Object.assign(this.config.sorting, config.sorting);
      }
  
      let filteredData = this.changeFilter(this.data, this.config);
      let sortedData = this.changeSort(filteredData, this.config);
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;
    }
  
    public onCellClick(data: any): any {
      console.log(data);
    }

   


}

export const TableData: Array<any> = [
    {
        'name': 'Victoria Cantrell',
        'position': 'Integer Corporation',
        'office': 'Croatia',
        'ext': `<strong>0839</strong>`,
        'startDate': '2015/08/19',
        'salary': 208.178
      }, {
        'name': 'Pearl Crosby',
        'position': 'In PC',
        'office': 'Cambodia',
        'ext': `<strong>8262</strong>`,
        'startDate': '2014/10/08',
        'salary': 114.367
      }, {
        'name': 'Colette Foley',
        'position': 'Lorem Inc.',
        'office': 'Korea, North',
        'ext': '8968',
        'startDate': '2015/07/19',
        'salary': 721.473
      }, {
        'name': 'Anastasia Shaffer',
        'position': 'Dolor Nulla Semper LLC',
        'office': 'Suriname',
        'ext': '7980',
        'startDate': '2015/04/20',
        'salary': 264.620
      }, {
        'name': 'Gabriel Castro',
        'position': 'Sed Limited',
        'office': 'Bahrain',
        'ext': '0757',
        'startDate': '2015/03/04',
        'salary': 651.350
      }, {
        'name': 'Cherokee Ware',
        'position': 'Tincidunt LLC',
        'office': 'United Kingdom (Great Britain)',
        'ext': '3995',
        'startDate': '2015/06/17',
        'salary': 666.259
      }, {
        'name': 'Barry Moss',
        'position': 'Sociis Industries',
        'office': 'Western Sahara',
        'ext': '6697',
        'startDate': '2015/08/13',
        'salary': 541.631
      }, {
        'name': 'Maryam Tucker',
        'position': 'Elit Pede Malesuada Inc.',
        'office': 'Brazil',
        'ext': '5203',
        'startDate': '2014/10/02',
        'salary': 182.294
      }, {
        'name': 'Constance Clayton',
        'position': 'Auctor Velit Aliquam LLP',
        'office': 'United Arab Emirates',
        'ext': '4204',
        'startDate': '2015/08/01',
        'salary': 218.597
      }, {
        'name': 'Rogan Tucker',
        'position': 'Arcu Vestibulum Ante Associates',
        'office': 'Jersey',
        'ext': '0885',
        'startDate': '2015/01/04',
        'salary': 861.632
      }, {
        'name': 'Emery Mcdowell',
        'position': 'Gravida Company',
        'office': 'New Zealand',
        'ext': '3951',
        'startDate': '2015/06/02',
        'salary': 413.568
      }, {
        'name': 'Yael Greer',
        'position': 'Orci Limited',
        'office': 'Madagascar',
        'ext': '1416',
        'startDate': '2014/12/04',
        'salary': 121.831
      }, {
        'name': 'Jared Burgess',
        'position': 'Auctor Incorporated',
        'office': 'Burundi',
        'ext': '4673',
        'startDate': '2015/01/12',
        'salary': 62.243
      }, {
        'name': 'Sharon Campbell',
        'position': 'Elit Curabitur Sed Consulting',
        'office': 'Comoros',
        'ext': '6274',
        'startDate': '2014/09/14',
        'salary': 200.854
      }, {
        'name': 'Yeo Church',
        'position': 'Donec Vitae Erat PC',
        'office': 'Saudi Arabia',
        'ext': '0269',
        'startDate': '2015/06/07',
        'salary': 581.193
      }, {
        'name': 'Kylie Barlow',
        'position': 'Fermentum Risus Corporation',
        'office': 'Papua New Guinea',
        'ext': '2010',
        'startDate': '2014/12/03',
        'salary': 418.115
      }, {
        'name': 'Nell Leonard',
        'position': 'Vestibulum Consulting',
        'office': 'Saudi Arabia',
        'ext': '4839',
        'startDate': '2015/05/29',
        'salary': 466.201
      }, {
        'name': 'Brandon Fleming',
        'position': 'Donec Egestas Associates',
        'office': 'Poland',
        'ext': '0622',
        'startDate': '2015/01/22',
        'salary': 800.011
      }, {
        'name': 'Inga Pena',
        'position': 'Et Magnis Dis Limited',
        'office': 'Belgium',
        'ext': '8140',
        'startDate': '2015/05/18',
        'salary': 564.245
      }, {
        'name': 'Arden Russo',
        'position': 'Est Tempor Bibendum Corp.',
        'office': 'Dominican Republic',
        'ext': '6774',
        'startDate': '2015/07/23',
        'salary': 357.222
      }, {
        'name': 'Liberty Gallegos',
        'position': 'Nec Diam LLC',
        'office': 'Ghana',
        'ext': '9266',
        'startDate': '2015/06/18',
        'salary': 554.375
      }, {
        'name': 'Dennis York',
        'position': 'Nullam Suscipit Foundation',
        'office': 'Namibia',
        'ext': '3133',
        'startDate': '2015/03/20',
        'salary': 90.417
      }, {
        'name': 'Petra Chandler',
        'position': 'Pede Nonummy Inc.',
        'office': 'Namibia',
        'ext': '3367',
        'startDate': '2015/03/26',
        'salary': 598.915
      }, {
        'name': 'Aurelia Marshall',
        'position': 'Donec Consulting',
        'office': 'Nicaragua',
        'ext': '2690',
        'startDate': '2015/08/18',
        'salary': 201.680
      }, {
        'name': 'Rose Carter',
        'position': 'Enim Consequat Purus Industries',
        'office': 'Morocco',
        'ext': '0619',
        'startDate': '2015/03/06',
        'salary': 220.187
      }, {
        'name': 'Denton Atkins',
        'position': 'Non Vestibulum PC',
        'office': 'Mali',
        'ext': '5806',
        'startDate': '2015/04/19',
        'salary': 324.588
      }, {
        'name': 'Germaine Osborn',
        'position': 'Tristique Aliquet PC',
        'office': 'Lesotho',
        'ext': '4469',
        'startDate': '2015/01/19',
        'salary': 351.108
      }, {
        'name': 'Nell Butler',
        'position': 'Sit Amet Dapibus Industries',
        'office': 'Cuba',
        'ext': '7860',
        'startDate': '2015/01/06',
        'salary': 230.072
      }, {
        'name': 'Brent Stein',
        'position': 'Eu Augue Porttitor LLP',
        'office': 'Cyprus',
        'ext': '4697',
        'startDate': '2014/11/02',
        'salary': 853.413
      }, {
        'name': 'Alexandra Shaw',
        'position': 'Aenean Gravida Limited',
        'office': 'Uruguay',
        'ext': '1140',
        'startDate': '2015/05/16',
        'salary': 401.970
      }, {
        'name': 'Veronica Allison',
        'position': 'Aliquet Diam Sed Institute',
        'office': 'Samoa',
        'ext': '9966',
        'startDate': '2015/05/17',
        'salary': 79.193
      }, {
        'name': 'Katelyn Gamble',
        'position': 'Sed Associates',
        'office': 'Mauritius',
        'ext': '4767',
        'startDate': '2015/03/20',
        'salary': 484.299
      }, {
        'name': 'James Greer',
        'position': 'A Dui Incorporated',
        'office': 'Norway',
        'ext': '5517',
        'startDate': '2015/02/21',
        'salary': 333.518
      }, {
        'name': 'Cain Vasquez',
        'position': 'Nulla Facilisis Suspendisse Institute',
        'office': 'China',
        'ext': '3179',
        'startDate': '2015/05/27',
        'salary': 651.761
      }, {
        'name': 'Shaeleigh Barr',
        'position': 'Eleifend Cras Institute',
        'office': 'Ghana',
        'ext': '5904',
        'startDate': '2015/04/01',
        'salary': 627.095
      }, {
        'name': 'Baker Mckay',
        'position': 'Ut Sagittis Associates',
        'office': 'Isle of Man',
        'ext': '9840',
        'startDate': '2015/01/12',
        'salary': 742.247
      }, {
        'name': 'Jayme Pace',
        'position': 'Cras Eu Tellus Associates',
        'office': 'Bouvet Island',
        'ext': '4580',
        'startDate': '2015/08/12',
        'salary': 591.588
      }, {
        'name': 'Reuben Albert',
        'position': 'Lobortis Institute',
        'office': 'Zambia',
        'ext': '8725',
        'startDate': '2015/04/04',
        'salary': 791.408
      }, {
        'name': 'Idola Burns',
        'position': 'Non Industries',
        'office': 'Myanmar',
        'ext': '3201',
        'startDate': '2015/06/24',
        'salary': 142.906
      }, {
        'name': 'Laura Macias',
        'position': 'Phasellus Inc.',
        'office': 'Mauritania',
        'ext': '2033',
        'startDate': '2014/11/21',
        'salary': 226.591
      }, {
        'name': 'Nichole Salas',
        'position': 'Duis PC',
        'office': 'Madagascar',
        'ext': '4397',
        'startDate': '2015/01/18',
        'salary': 234.196
      }, {
        'name': 'Hunter Walter',
        'position': 'Ullamcorper Duis Cursus Foundation',
        'office': 'Brazil',
        'ext': '2227',
        'startDate': '2015/02/28',
        'salary': 655.052
      }, {
        'name': 'Asher Rich',
        'position': 'Mauris Ipsum LLP',
        'office': 'Paraguay',
        'ext': '7288',
        'startDate': '2015/08/08',
        'salary': 222.946
      }, {
        'name': 'Angela Carlson',
        'position': 'Donec Tempor Institute',
        'office': 'Papua New Guinea',
        'ext': '5416',
        'startDate': '2015/02/12',
        'salary': 562.194
      }, {
        'name': 'James Dorsey',
        'position': 'Ipsum Leo Associates',
        'office': 'Congo (Brazzaville)',
        'ext': '6019',
        'startDate': '2015/01/10',
        'salary': 629.925
      }, {
        'name': 'Wesley Cobb',
        'position': 'Nunc Est Incorporated',
        'office': 'Australia',
        'ext': '6466',
        'startDate': '2015/01/30',
        'salary': 343.476
      }, {
        'name': 'Meghan Stephens',
        'position': 'Interdum PC',
        'office': 'Turkey',
        'ext': '8001',
        'startDate': '2014/10/11',
        'salary': 469.305
      }, {
        'name': 'Bertha Herrera',
        'position': 'Amet Limited',
        'office': 'Kenya',
        'ext': '4799',
        'startDate': '2014/11/22',
        'salary': 56.606
      }, {
        'name': 'Karina Key',
        'position': 'Quisque Varius Nam Company',
        'office': 'France',
        'ext': '3907',
        'startDate': '2015/03/26',
        'salary': 314.260
      }, {
        'name': 'Uriel Carson',
        'position': 'Penatibus PC',
        'office': 'Venezuela',
        'ext': '5902',
        'startDate': '2015/01/07',
        'salary': 106.335
      }, {
        'name': 'Mira Baird',
        'position': 'Felis Orci PC',
        'office': 'Niue',
        'ext': '4189',
        'startDate': '2015/08/25',
        'salary': 515.671
      }, {
        'name': 'Ursula Parrish',
        'position': 'Ac Corporation',
        'office': 'Macao',
        'ext': '4771',
        'startDate': '2015/06/30',
        'salary': 72.295
      }, {
        'name': 'Josephine Sykes',
        'position': 'Blandit Congue Limited',
        'office': 'Holy See (Vatican City State)',
        'ext': '4684',
        'startDate': '2014/12/22',
        'salary': 694.656
      }, {
        'name': 'Maggie Sims',
        'position': 'Vulputate Posuere Industries',
        'office': 'Sudan',
        'ext': '6482',
        'startDate': '2014/11/22',
        'salary': 363.743
      }, {
        'name': 'Rogan Fuentes',
        'position': 'Vestibulum Accumsan Neque Company',
        'office': 'Jersey',
        'ext': '4837',
        'startDate': '2015/07/29',
        'salary': 606.004
      }, {
        'name': 'Maya Haney',
        'position': 'Ac Foundation',
        'office': 'Falkland Islands',
        'ext': '5752',
        'startDate': '2015/09/03',
        'salary': 745.500
      }, {
        'name': 'Aquila Battle',
        'position': 'Sociis Natoque Penatibus Foundation',
        'office': 'Azerbaijan',
        'ext': '8470',
        'startDate': '2015/03/06',
        'salary': 582.265
      }, {
        'name': 'Connor Coleman',
        'position': 'Orci Lacus Vestibulum Foundation',
        'office': 'Croatia',
        'ext': '6217',
        'startDate': '2014/10/21',
        'salary': 416.958
      }, {
        'name': 'Charity Thomas',
        'position': 'Convallis Ligula Donec Inc.',
        'office': 'Benin',
        'ext': '6240',
        'startDate': '2015/07/12',
        'salary': 540.999
      }, {
        'name': 'Blythe Powers',
        'position': 'Amet Orci Limited',
        'office': 'Falkland Islands',
        'ext': '5608',
        'startDate': '2015/01/23',
        'salary': 480.067
      }, {
        'name': 'Adria Battle',
        'position': 'Ornare Lectus Incorporated',
        'office': 'British Indian Ocean Territory',
        'ext': '7419',
        'startDate': '2015/05/28',
        'salary': 257.937
      }, {
        'name': 'Melanie Mcintyre',
        'position': 'Nunc Corp.',
        'office': 'Mongolia',
        'ext': '4326',
        'startDate': '2015/01/06',
        'salary': 359.737
      }, {
        'name': 'Keely Bauer',
        'position': 'Nec Tempus Institute',
        'office': 'Somalia',
        'ext': '8372',
        'startDate': '2015/03/09',
        'salary': 99.718
      }, {
        'name': 'Noelani Strong',
        'position': 'Nec LLP',
        'office': 'Iran',
        'ext': '0049',
        'startDate': '2015/08/24',
        'salary': 480.718
      }, {
        'name': 'Jeanette Henderson',
        'position': 'Eu Elit Nulla Corporation',
        'office': 'Italy',
        'ext': '7586',
        'startDate': '2015/06/19',
        'salary': 253.772
      }, {
        'name': 'Candace Huber',
        'position': 'Sed Institute',
        'office': 'Uganda',
        'ext': '7183',
        'startDate': '2015/06/16',
        'salary': 388.879
      }, {
        'name': 'Bethany Potter',
        'position': 'Vivamus Nibh Dolor Incorporated',
        'office': 'Puerto Rico',
        'ext': '3354',
        'startDate': '2014/11/12',
        'salary': 747.310
      }, {
        'name': 'Whoopi Burks',
        'position': 'Justo Inc.',
        'office': 'Fiji',
        'ext': '2185',
        'startDate': '2014/09/24',
        'salary': 803.037
      }, {
        'name': 'Sheila Long',
        'position': 'Diam Associates',
        'office': 'Sao Tome and Principe',
        'ext': '7760',
        'startDate': '2014/12/21',
        'salary': 674.379
      }, {
        'name': 'Sonya Church',
        'position': 'Laoreet Institute',
        'office': 'Grenada',
        'ext': '8920',
        'startDate': '2015/06/03',
        'salary': 625.147
      }, {
        'name': 'Shaine Forbes',
        'position': 'Eu Arcu LLP',
        'office': 'Cyprus',
        'ext': '2369',
        'startDate': '2015/01/18',
        'salary': 208.100
      }, {
        'name': 'Alexandra Patrick',
        'position': 'Ligula Donec Inc.',
        'office': 'Viet Nam',
        'ext': '8531',
        'startDate': '2015/04/09',
        'salary': 104.063
      }, {
        'name': 'Patience Vincent',
        'position': 'Sem Molestie Associates',
        'office': 'Philippines',
        'ext': '8888',
        'startDate': '2015/07/04',
        'salary': 673.556
      }, {
        'name': 'Evelyn Smith',
        'position': 'Fusce Industries',
        'office': 'Togo',
        'ext': '5051',
        'startDate': '2015/08/15',
        'salary': 737.284
      }, {
        'name': 'Kieran Gonzalez',
        'position': 'Non Corp.',
        'office': 'Equatorial Guinea',
        'ext': '4834',
        'startDate': '2015/08/24',
        'salary': 90.195
      }, {
        'name': 'Molly Oneil',
        'position': 'Non Dui Consulting',
        'office': 'Belize',
        'ext': '7501',
        'startDate': '2014/10/28',
        'salary': 140.767
      }, {
        'name': 'Nigel Davenport',
        'position': 'Ullamcorper Velit In Industries',
        'office': 'Vanuatu',
        'ext': '0976',
        'startDate': '2015/03/16',
        'salary': 70.536
      }, {
        'name': 'Thor Young',
        'position': 'Malesuada Consulting',
        'office': 'French Southern Territories',
        'ext': '0211',
        'startDate': '2015/01/28',
        'salary': 75.501
      }, {
        'name': 'Finn Delacruz',
        'position': 'Lorem Industries',
        'office': 'Cocos (Keeling) Islands',
        'ext': '2980',
        'startDate': '2014/12/11',
        'salary': 754.967
      }, {
        'name': 'Lane Henderson',
        'position': 'Pede Foundation',
        'office': 'Kazakhstan',
        'ext': '1446',
        'startDate': '2015/07/02',
        'salary': 842.050
      }, {
        'name': 'Shea Potter',
        'position': 'Curabitur Limited',
        'office': 'Timor-Leste',
        'ext': '4654',
        'startDate': '2015/05/07',
        'salary': 263.629
      }, {
        'name': 'Brynn Yang',
        'position': 'Ut Limited',
        'office': 'Mayotte',
        'ext': '4668',
        'startDate': '2015/01/17',
        'salary': 74.292
      }, {
        'name': 'Kylan Fuentes',
        'position': 'Sapien Aenean Associates',
        'office': 'Brazil',
        'ext': '6623',
        'startDate': '2014/12/28',
        'salary': 108.632
      }, {
        'name': 'Lionel Mcbride',
        'position': 'Ipsum PC',
        'office': 'Portugal',
        'ext': '3978',
        'startDate': '2015/07/11',
        'salary': 34.244
      }, {
        'name': 'Paul Lucas',
        'position': 'Eget LLP',
        'office': 'Nicaragua',
        'ext': '8890',
        'startDate': '2014/09/30',
        'salary': 690.834
      }, {
        'name': 'Lareina Williamson',
        'position': 'Imperdiet Ullamcorper Ltd',
        'office': 'Cocos (Keeling) Islands',
        'ext': '9489',
        'startDate': '2014/12/01',
        'salary': 603.498
      }, {
        'name': 'Amy Acevedo',
        'position': 'Id Institute',
        'office': 'Cook Islands',
        'ext': '5592',
        'startDate': '2015/02/04',
        'salary': 125.165
      }, {
        'name': 'Nomlanga Silva',
        'position': 'Eget LLC',
        'office': 'Belize',
        'ext': '3110',
        'startDate': '2015/01/31',
        'salary': 268.509
      }, {
        'name': 'Amena Stone',
        'position': 'Enim Incorporated',
        'office': 'Guinea',
        'ext': '1211',
        'startDate': '2014/09/23',
        'salary': 214.381
      }, {
        'name': 'Danielle Coffey',
        'position': 'Feugiat Placerat Corp.',
        'office': 'Sao Tome and Principe',
        'ext': '8176',
        'startDate': '2015/06/17',
        'salary': 137.423
      }, {
        'name': 'Buffy Russell',
        'position': 'Lacus Quisque Ltd',
        'office': 'Ecuador',
        'ext': '6741',
        'startDate': '2014/10/17',
        'salary': 612.184
      }, {
        'name': 'Kaitlin Lamb',
        'position': 'Malesuada Fringilla Est Associates',
        'office': 'Algeria',
        'ext': '5054',
        'startDate': '2014/10/18',
        'salary': 327.367
      }, {
        'name': 'Leilani Yates',
        'position': 'Mus Proin LLC',
        'office': 'South Sudan',
        'ext': '1550',
        'startDate': '2015/05/27',
        'salary': 743.493
      }, {
        'name': 'Jemima Moon',
        'position': 'Phasellus Corp.',
        'office': 'South Georgia and The South Sandwich Islands',
        'ext': '7582',
        'startDate': '2015/05/21',
        'salary': 496.067
      }, {
        'name': 'Hiroko Schwartz',
        'position': 'Neque Institute',
        'office': 'Saint Vincent and The Grenadines',
        'ext': '9368',
        'startDate': '2015/03/13',
        'salary': 178.782
      }, {
        'name': 'Nathaniel Jensen',
        'position': 'Mi Tempor Limited',
        'office': 'Dominica',
        'ext': '8331',
        'startDate': '2014/12/05',
        'salary': 37.441
      }, {
        'name': 'Silas Sweeney',
        'position': 'Ultrices Institute',
        'office': 'Turkmenistan',
        'ext': '0746',
        'startDate': '2014/11/13',
        'salary': 152.980
      }, {
        'name': 'Jermaine Barry',
        'position': 'Dapibus Corporation',
        'office': 'Uzbekistan',
        'ext': '1545',
        'startDate': '2015/03/06',
        'salary': 409.463
      }, {
        'name': 'Tatiana Nichols',
        'position': 'Nec Diam Industries',
        'office': 'Cook Islands',
        'ext': '4395',
        'startDate': '2015/05/22',
        'salary': 51.155
      }, {
        'name': 'Rama Waller',
        'position': 'Sem Pellentesque LLC',
        'office': 'Andorra',
        'ext': '2973',
        'startDate': '2014/12/01',
        'salary': 223.227
      }

];