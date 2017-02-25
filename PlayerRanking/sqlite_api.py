import pandas as pd
import sqlite3

# By Ryan McKinney

def select_to_df(db, table, var_list, where=''):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    
    # create dataframe with correct labels
    df = pd.DataFrame(columns=var_list)
    
    # create variable string
    var_str = ''
    first = True
    for var in var_list:
        if not first:
            var_str += ', ' + var
        else:
            var_str += var
            first = False
            
    # create query string
    query = 'SELECT ' + var_str + ' FROM ' + table + ' ' + where

    for row in c.execute(query):
        row_d = dict()
        for ndx in range(len(row)):
            row_d[var_list[ndx]] = row[ndx]
        df = df.append(row_d, ignore_index=True)
        
    return df