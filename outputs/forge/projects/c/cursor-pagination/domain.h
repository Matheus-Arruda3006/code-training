#ifndef DOMAIN_H
#define DOMAIN_H
typedef long long ll;
typedef struct {int n;int cols;ll values[200][8];} Matrix;
typedef struct {int count;int error;ll values[2000];} Result;
Result solve(const Matrix* data);
#endif
